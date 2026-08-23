# Digital Nomad App

App mobile para digital nomads explorarem cidades — autenticação, lista com filtros, detalhes, mapa e cidades relacionadas.

Stack principal: **Expo SDK 54**, **Expo Router**, **React Native**, **Restyle**, **Reanimated**, **Supabase Auth**, **react-hook-form** + **Zod**.

> Ao escrever código Expo, consulte a docs versionada: https://docs.expo.dev/versions/v54.0.0/

## Pré-requisitos

- Node.js (LTS recomendado)
- npm
- Conta e projeto no [Supabase](https://supabase.com)
- Extensão **PostGIS** habilitada no banco (usada nos scripts SQL)
- Expo Go ou emulador/simulador (Android/iOS)

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env
```

Preencha no `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=<sua-url>
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<sua-publishable-key>
EXPO_PUBLIC_SUPABASE_STORAGE_URL=https://<seu-projeto>.supabase.co/storage/v1/object/public
EXPO_PUBLIC_WEB_URL=https://<sua-url-web>.com
```

- `EXPO_PUBLIC_WEB_URL` é usada no redirect do reset de senha (`/reset-password`).
- O arquivo `.env` está no `.gitignore` e não deve ser commitado.

### 3. Banco de dados (Supabase)

Rode os scripts em `src/infra/repositories/adapters/supabase/data/sql/` **nessa ordem** no SQL Editor do Supabase:

1. `1-create-tables.sql` — tabelas + PostGIS
2. `2-seed-categories.sql`
3. `3-seed-cities.sql`
4. `4-seed-tourist_attractions-CTE.sql`
5. `5-seed-city_categories-CTE.sql`
6. `6-seed-city_cities-CTE.sql`
7. `7-create-view-cities_with_full_info.sql`
8. `8-create-view-cities_with_categories.sql`
9. `9-create-view-related-cities.sql`

Opcional: `update-cities-cover-images.sql` se precisar ajustar paths de cover no Storage.

Faça upload das imagens de capa no Storage (bucket/path alinhado aos seeds, ex.: `digital-nomad/cover/...`).

Habilite **Email Auth** no Supabase (sign-up, sign-in e reset password).

### 4. Rodar o app

```bash
npm start
```

Atalhos:

```bash
npm run android
npm run ios
npm run web
```

## Scripts úteis

| Script | Descrição |
| --- | --- |
| `npm start` | Inicia o Expo |
| `npm run lint` | ESLint (`expo lint`) |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |

## Estrutura do projeto

```text
app/                         # Rotas (Expo Router)
  (protected)/               # Área autenticada (tabs + city-details)
  sign-in.tsx
  sign-up.tsx
  reset-password.tsx
src/
  domain/                    # Models, contratos de repo e use-cases
    auth/                    # AuthContext, IAuthRepo, operations
    city/
    category/
  infra/                     # Implementações técnicas
    operations/              # useAppQuery, useAppMutation
    repositories/adapters/   # inMemory | supabase
    storage/                 # StorageProvider + AsyncStorage
  services/                  # FeedbackProvider (console | alert | toast)
  ui/                        # Components, containers e theme
  hooks/                     # useDebounce, useSafeArea…
  utils/
assets/                      # Fontes, ícones IcoMoon, imagens
docs/prs/                    # Rascunhos de descrição de PRs
```

## Arquitetura (visão geral)

Camadas principais:

| Camada | Papel |
| --- | --- |
| `domain` | Regras e operations (`useAuthSignIn`, `useCityFindAll`…) |
| `infra` | Adapters de dados/storage (Supabase, in-memory, AsyncStorage) |
| `ui` | Apresentação (Restyle, forms, screens containers) |
| `services` | Cross-cutting (feedback/Toast) |

- **Repository Pattern:** `RepositoryProvider` troca entre `SupabaseRepositories` e `InMemoryRepository` no `_layout`.
- **Auth:** sessão via `AuthContext` + splash até restore; telas protegidas em `(protected)`.
- **Forms:** `react-hook-form` + Zod (ex.: `SignUpForm` / `SignUpSchema`).
- **Feedback:** `ToastFeedback` (padrão), com adapters console/alert também disponíveis.
- **Animações / mapas:** Reanimated e `react-native-maps`.

Para testar sem backend, use temporariamente `InMemoryRepository` no root layout.

## Desenvolvimento

- Tipagem: TypeScript strict; use a versão do workspace (`node_modules/typescript`)
- Debug: Reactotron carrega só em `__DEV__` (`ReactotronConfig.js`)
- Labels e PRs: veja `docs/labels.md` e `docs/prs/`
- Não commitar `.env`, `node_modules`, `.expo` ou `project-archives/`

## Documentação relacionada

- [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase JS](https://supabase.com/docs/reference/javascript/introduction)
- [Restyle](https://github.com/Shopify/restyle)
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
