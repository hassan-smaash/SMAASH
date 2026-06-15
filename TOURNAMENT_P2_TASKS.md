# SMAASH — Tournament Phase 1 (P2) Task Breakdown

> **HARD RULE: do NOT modify K-factor or the rating calculation.** Tournament matches reuse the
> EXISTING match-submission + rating pipeline exactly as-is. No new K, no applied_k logic, no
> Glicko-2 work. The tasks below are everything OTHER than rating.
>
> **Reality:** the tournament feature is a ~30% UI prototype (js/09-feature-screens.js): creation
> wizard + single-round draw + round-robin pairing exist **in local React state only**. No Supabase
> persistence, no multi-round advancement, no realtime. So "test/fix" = **build, then test.**

---

## Phase 1 FOUNDATION (prerequisite for everything)

- [x] **F1. DB schema** — tables created (by Hassan). RLS + `matches.tournament_id` added in `sql/tournaments_f1_rls.sql` (RUN IT).
- [x] **F2. Persist creation** — TournamentDirectorScreen now loads tournaments from Supabase on mount and
      createTournament POSTs to `tournaments` (status `registration_open`, created_by = current user). Also fixed the
      latent `profiles` undefined crash by passing currentUser/profiles into the screen.
- [x] **F3. Persist entries** — built the entry UI (didn't exist). TournamentManageView now has an ENTRIES section:
      search + add real players, "+8/+16 dummy" quick-add, click-chip to remove. Writes/reads `tournament_entries`
      with rating/RD snapshots. (Dummy players = real profiles, since player_id FKs auth.users.)
- [x] **F4. Score submission** — confirming a bracket match inserts a `matches` row as `pending` then PATCHes it
      to `confirmed` (the app's exact normal flow → existing BEFORE-UPDATE rating trigger fires, K/rating untouched),
      sets `tournament_id`, and links `tournament_matches.match_id`.

---

## Task 2 — Single Elimination end-to-end (dummy data)
- [x] 2a. Generate Draw: seeds entries, builds the FULL bracket (all rounds) with BYEs + `next_match_id`
        wiring, persists to `tournament_matches` (final-first insert so the self-FK resolves), sets status in_progress.
- [x] 2b. **Multi-round advancement**: on confirm, the winner is PATCHed into the `next_match_id` slot
        (slot derived from bracket position); the next-round match becomes playable once both slots fill.
- [x] 2c. Score submission goes through F4 (insert pending → confirm → existing rating flow).
- [x] 2d. Bracket renders from DB (read-only for now) so a refresh keeps state.
- [ ] 2e. **TEST:** 8-entrant dummy draw → play QF → SF → Final; winners advance correctly, champion recorded.

## Task 3 — Fix bugs found (bracket & scoring only — NOT rating)
- [x] 3a. Seeding verified (Node sim): standard bracket order, byes land on top seeds (see Task 5).
- [x] 3b. Advancement slot derived from `bracket_slot` parity — verified correct in the SE play-through.
- [x] 3c. Round labels correct (Quarter-Final / Semi-Final / Final), driven by matches-per-round.
- [x] 3f. **Concurrency guard**: `confirmingId` blocks double-submit; Confirm button shows "Saving…" + disabled.
- [x] 3g. **Destructive-action guards**: Regenerate & Reopen `window.confirm()` when played matches exist
        (won't silently rebuild / re-rate).
- [x] 3d. **Void/undo** (PRD §6.3 simplified): TD "Undo" on a completed match clears the winner, un-advances
        the next slot, marks the linked match row `voided`, and reverts a completed tournament to in_progress.
        Blocks undo if the later-round match is already played. (Ratings are not reverted — rating constraint.)
- [x] 3e. Refresh keeps bracket state (loads from DB) + roster locks once the draw exists.

## Task 4 — Round Robin end-to-end (same way)
- [x] 4a. Generate Round Robin: all-play-all pairs persisted to `tournament_matches` (round 1, no advancement).
- [x] 4b. Score submission goes through F4 (insert pending → confirm → existing rating, K untouched).
- [x] 4c. Live standings from DB: played, W, L, points, **point differential** (games for−against from linked
        match rows), sorted points → diff → wins. Winner banner when all matches done.
- [ ] 4d. **TEST:** 4–6 entrant RR, play all matches, verify standings + ordering.

> Reopen escape hatch: a **"Reopen registration"** button on a started tournament wipes the bracket and resets
> status to registration_open so the roster unlocks. (Already-applied ratings are not reverted.)

## Task 5 — BYE logic for non-power-of-2 draw sizes  ✅ VERIFIED
- [x] 5a. Bracket-size rounding produces the right bye count — Node sim passed for n=2,3,5,6,8,11,12,16.
- [x] 5b. BYEs land on the **top seeds** (standard convention). ⚠️ PRD §6.2 says "lowest-seeded" which reads
        backwards; using standard (seed 1 protected). **Confirm with Hassan** if they truly want the opposite.
- [x] 5c. BYE auto-advances its player into the next-round matchup at draw time.
- [x] 5d. A BYE creates **no** `matches` row → never enters the rating pipeline.
- [x] 5e. Verified via Node simulation: correct bye count, no double-byes, top seeds get byes.

## Task 6 — Realtime leaderboard on score submission
- [x] 6a. Standings/bracket read from DB (`tournament_matches` + linked match rows).
- [x] 6b. Supabase Realtime subscription on `tournament_matches` (reuses `smaashRealtime`) → debounced
        re-fetch of bracket + match rows on any change. Needs `replica identity full` (added to F1 SQL — RERUN IT).
- [x] 6c. **Public shareable leaderboard** at `/t/{slug}` — no login. Slug generated on create; entry names
        denormalised to `tournament_entries.display_name` (anon can't read profiles). Read-only standings/bracket,
        live via Realtime. "Copy" share link in the manage view. (Run `sql/tournaments_6c_public.sql`.)
- [ ] 6d. **TEST:** two browsers; submit a score in one → other updates within ~2s.

---

## Scope decision (non-rating)
- Phase 1 = **Single Elimination + Round Robin only**. Defer Double/Triple Elim, Swiss, Malaysian,
  and Inter-Club League to later phases.
