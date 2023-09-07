import Dashboard from "./views/Dashboard.js";
import Settings from "./views/Settings.js";
import Albums from "./views/Albums.js";
import AlbumView from "./views/AlbumView.js";

// Function to generate a regular expression from the path
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Function to get the matched parameters from the URL
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

// Main routing function
const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/albums', view: Albums },
    { path: '/album-view/:id', view: AlbumView },
    { path: '/settings', view: Settings },
  ];

  const potentialMatches = routes.map(route => ({
    route: route,
    result: location.pathname.match(pathToRegex(route.path))
  }));

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null) || {
    route: routes[0],
    result: [location.pathname]
  };

  const view = new match.route.view(getParams(match));
  document.querySelector("#app").innerHTML = await view.getHtml();
}

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
