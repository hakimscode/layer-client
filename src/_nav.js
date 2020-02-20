export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Master",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Kategori Produk",
      url: "/data/KategoriProduk",
      icon: "icon-magic-wand"
    },
    {
      name: "Produk",
      url: "/data/Produk",
      icon: "icon-layers"
    },
    {
      name: "Supplier",
      url: "/data/Suppliers",
      icon: "icon-plane"
    },
    {
      name: "Customer",
      url: "/data/Customers",
      icon: "icon-people"
    },
    {
      name: "Kandang",
      url: "/data/Kandangs",
      icon: "icon-home"
    },
    {
      title: true,
      name: "Data"
    },
    {
      name: "Gudang Telur",
      url: "/data/GudangTelurs",
      icon: "icon-social-dropbox"
    },
    {
      name: "Project",
      url: "/data/Projects",
      icon: "icon-note"
    },
    {
      title: true,
      name: "Transaction"
    },
    {
      name: "Pembelian",
      url: "/transactions/Pembelian",
      icon: "icon-basket"
    },
    {
      name: "Penjualan",
      url: "/transactions/Penjualan",
      icon: "icon-basket-loaded"
    }
  ]
};
