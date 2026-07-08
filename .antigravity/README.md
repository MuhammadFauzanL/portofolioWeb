# Antigravity Skills Directory

Folder ini didedikasikan untuk menyimpan "Skill Files" (`.md`) yang dapat dibaca dan dieksekusi secara otomatis oleh AI Agent Antigravity.

## Struktur Direktori
- `/backend/` : Skill untuk audit, perbaikan, atau pembuatan fitur Laravel (misal: `audit-security.md`).
- `/database/` : Skill untuk manajemen migrasi, seeder, dan ERD.
- `/qa/` : Skill untuk testing, pengujian payload, dan validasi flow aplikasi.
- `/deployment/` : Skill untuk prosedur rilis ke server/production.
- `/templates/` : Template dasar untuk membuat skill baru.

## Cara Penggunaan
Saat Anda ingin AI mengerjakan tugas spesifik yang sudah pernah dibuatkan skill-nya, Anda cukup berkata di chat:
> "Tolong jalankan instruksi di file `.antigravity/skills/backend/audit-register.md` dengan mode IsSkillFile: true"
