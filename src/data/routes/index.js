const routeModules = import.meta.glob('./*.json', { eager: true });

const routes = {};
for (const [path, mod] of Object.entries(routeModules)) {
  const data = mod.default || mod;
  routes[data.id] = data;
}

export function getAllRoutes() {
  return Object.values(routes);
}

export function getRoute(id) {
  return routes[id] || null;
}
