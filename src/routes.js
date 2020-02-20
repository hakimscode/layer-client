import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Laporan = React.lazy(() => import("./views/Data/Laporan"));

const KategoriProduk = React.lazy(() => import("./views/Data/KategoriProduk/KategoriProduk"));
const Produk = React.lazy(() => import("./views/Data/Produk/Produk"));
const Suppliers = React.lazy(() => import("./views/Data/Suppliers/Suppliers"));
const Customers = React.lazy(() => import("./views/Data/Customers/Customers"));
const Kandangs = React.lazy(() => import("./views/Data/Kandangs/Kandangs"));
const GudangTelurs = React.lazy(() => import("./views/Data/GudangTelur/GudangTelurs"));
const Projects = React.lazy(() => import("./views/Data/Project/Projects"));
const DetailProject = React.lazy(() => import("./views/Data/Project/DetailProject"));
const Penjualan = React.lazy(() => import("./views/Transactions/Penjualan/Penjualan"));
const Pembelian = React.lazy(() => import("./views/Transactions/Pembelian/Pembelian"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/data", exact: true, name: "Data", component: Laporan },
  { path: "/data/laporan", exact: true, name: "Laporan", component: Laporan },
  {
    path: "/data/KategoriProduk/",
    name: "Kategori Produk",
    component: KategoriProduk
  },
  {
    path: "/data/Produk/",
    name: "Produk",
    component: Produk
  },
  {
    path: "/data/Suppliers",
    name: "Suppliers",
    component: Suppliers
  },
  {
    path: "/data/Customers",
    name: "Customer",
    component: Customers
  },
  {
    path: "/data/Kandangs",
    name: "Kandang",
    component: Kandangs
  },
  {
    path: "/data/GudangTelurs",
    name: "Gudang Telur",
    component: GudangTelurs
  },
  {
    path: "/data/Projects",
    name: "Project",
    component: Projects
  },
  {
    path: "/data/Project/:projectId",
    name: "Detail Project",
    component: DetailProject
  },
  {
    path: "/transactions/Penjualan",
    name: "Penjualan",
    component: Penjualan
  },
  {
    path: "/transactions/Pembelian",
    name: "Pembelian",
    component: Pembelian
  },
];

export default routes;
