# technical-challenge-next


Antes de hacer un build es necesario crear un archivo `.env`

```sh

#URL integrada para pruebas (este API falla intencionalmente el 30% de las veces)
NEXT_PUBLIC_API_ENDPOINT="http://localhost:3001/api"

#URL para pruebas en el servicio "beeceptor.com"
# NEXT_PUBLIC_API_ENDPOINT="https://ss-company.free.beeceptor.com"

```
en caso de usar el servicio **beeeceptor.com** hay que considerar que debe existir un endpoint para `/country`.
```js
//Así es como llamamos al API
process.env.NEXT_PUBLIC_API_ENDPOINT + '/company'

```

Para probar ejecutar `pnpm dev` o `npm run dev`

y probar contruir para producción `pnpm build` o `npm run build`

el proyecto puede probarse en esta url https://technical-challenge-next.vercel.app/

