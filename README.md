# Digital Nomad App

App mobile para explorar cidades para digital nomads — lista, filtros, detalhes, mapa e cidades relacionadas.

Stack principal: **Expo SDK 54**, **Expo Router**, **React Native**, **Restyle**, **Reanimated**, **Supabase**.

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
```

O arquivo `.env` está no `.gitignore` e não deve ser commitado.

### 3. Banco de dados (Supabase)

Rode os scripts em `src/data/sql/` **nessa ordem** no SQL Editor do Supabase:

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
app/                    # Rotas (Expo Router)
  (protected)/          # Área autenticada / tabs + city-details
  sign-in.tsx
src/
  components/           # UI reutilizável (Box, Text, CityCard, Accordion, BottomSheet…)
  containers/           # Composições de tela (filtros, seções de detalhes)
  data/                 # Hooks de dados + SQL
    sql/                # Schema, seeds e views do Supabase
  hooks/                # useDebounce, useSafeArea…
  supabase/             # Client, service, adapter e tipos gerados
  theme/                # Restyle theme (cores, spacing, tipografia Poppins)
assets/                 # Fontes, ícones IcoMoon, imagens
docs/prs/               # Rascunhos de descrição de PRs
```

## Arquitetura (visão geral)

- **UI / theme:** `@shopify/restyle` (`Box`, `Text`, tokens em `src/theme`)
- **Navegação:** Expo Router com typed routes
- **Animações:** Reanimated (Accordion, BottomSheet, list layout)
- **Mapas:** `react-native-maps`
- **Dados:** Supabase via `supabaseService` + `supabaseAdapter`
- **Hooks de fetch:** `useFetchData` compartilhado por `useCities`, `useCategories`, `useCityDetails`, `useRelatedCities`

## Desenvolvimento

- Tipagem: TypeScript strict; use a versão do workspace (`node_modules/typescript`)
- Debug: Reactotron carrega só em `__DEV__` (`ReactotronConfig.js`)
- Descrições de PR: adicione/atualize em `docs/prs/`
- Não commitar `.env`, `node_modules`, `.expo` ou `project-archives/`

## Documentação relacionada

- [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Supabase JS](https://supabase.com/docs/reference/javascript/introduction)
- [Restyle](https://github.com/Shopify/restyle)
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
