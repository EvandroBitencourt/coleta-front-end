/**
 * 1 - criamos o arquivo - ok
 * 2 - Fazemos o uso dele para armazenar o objeto router em src/App.vue - ok
 * 3 - Finalmente usamos ele em src/services/api/interceptors - ok
 */
const globalRouter = { router: null };

//exportamos o objeto globalRouter para ser usado externamente
export { globalRouter };
