#!/usr/bin/env bash
# Gera o build, monta .squarecloud/portfolio.zip e o manda para a SquareCloud.
# A plataforma não roda build e só instala dependências quando o app não tem node_modules: o pacote leva
# o .output sem node_modules e um package.json com as versões exatas que o Nitro rastreou no build.
#
# Uso: pnpm deploy:prod (precisa da CLI logada: squarecloud auth login)
# Com --bundle-only, só monta o zip.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
out="$root/.squarecloud"
cd "$root"

pnpm build

rm -rf "$out"
mkdir -p "$out/app"
cp -r .output squarecloud.app "$out/app/"
rm -rf "$out/app/.output/server/node_modules"
node -e '
  const { dependencies } = JSON.parse(require("node:fs").readFileSync(".output/server/package.json", "utf8"))
  const pkg = { name: "portfolio", private: true, type: "module", dependencies }
  process.stdout.write(JSON.stringify(pkg, null, 2) + "\n")
' > "$out/app/package.json"
(cd "$out/app" && zip -qr ../portfolio.zip .)
echo "pronto: $out/portfolio.zip ($(( $(stat -c %s "$out/portfolio.zip") / 1024 )) KB)"

[[ ${1:-} == --bundle-only ]] && exit 0

app_id=$(sed -n 's/^ID=//p' squarecloud.app | head -1)

# O commit troca os arquivos, mas mantém o node_modules e o package-lock.json do deploy anterior, e a
# plataforma não reinstala nada: uma dependência nova derrubaria o app. Sem eles, ela instala de novo.
for file in node_modules package-lock.json; do
  squarecloud app file delete "$file" --app "$app_id" -y || true
done
squarecloud commit "$app_id" --file "$out/portfolio.zip" --restart

# A borda guarda por um mês os arquivos sem hash no nome (os de public/), seja qual for o cache da origem.
squarecloud app network purge-cache "$app_id" --yes
