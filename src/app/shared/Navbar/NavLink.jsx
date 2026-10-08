import NavLinkClient from "./NavLinkClient";

const API = "https://api.api-store.workers.dev/api/bazardor";

const NavLink = async () => {
  const res = await fetch(`${API}/categories`);
  const categories = res.ok ? await res.json() : [];

  return <NavLinkClient categories={categories} />;
};

export default NavLink;