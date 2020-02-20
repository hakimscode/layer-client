import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  Form,
  FormText,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class Pembelian extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/pembelian";
    this.API_URL_SUPPLIERS = "http://localhost:5000/suppliers";
    this.API_URL_PROJECTS = "http://localhost:5000/projects";
    this.API_URL_PRODUCTS = "http://localhost:5000/produk";

    this.state = {
      pembelian: [],
      arrProject: [],
      arrSupplier: [],
      arrProducts: [],
      txt_tanggal: "",
      txt_project_id: "",
      txt_supplier_id: "",
      txt_produk_id: "",
      txt_jumlah_beli: "",
      txt_tonase_beli: "",
      txt_id: "",

      stok_telur: "",
      hint_stok_telur: "pilih project untuk mengetahui stok telur",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ pembelian: res.data.data });
    });
    axios.get(this.API_URL_SUPPLIERS).then(res => {
      this.setState({arrSupplier: res.data.data})
    });
    axios.get(this.API_URL_PROJECTS + '/0').then(res => {
      this.setState({arrProject: res.data.data})
    })
    axios.get(this.API_URL_PRODUCTS).then(res => {
      this.setState({arrProducts: res.data.data})
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    // if(e.target.name === 'txt_project_id'){
    //   this.hintTextStokTelur(e.target.value);
    // }
  };

  hintTextStokTelur = (val) => {
    if(val === ''){
      this.setState({hint_stok_telur: "pilih project untuk mengetahui stok telur"});
    }else{
      this.stokTelur(val)
    }
  }

  stokTelur = projectId => {
    axios.get(this.API_URL + '/stok-telur/' + projectId).then(res => {
      this.setState(
        {
          stok_telur: res.data.data,
          hint_stok_telur: `stok telur: ${res.data.data} butir`
        }
      )
    })
  }

  editClick = id_pembelian => {
    axios.get(this.API_URL + "/" + id_pembelian).then(res => {
      this.setState({
        txt_id: id_pembelian,
        txt_kategori: res.data.data.pembelian_kategori.id,
        txt_nama_pembelian: res.data.data.nama_pembelian,
        txt_satuan: res.data.data.satuan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_pembelian => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + id_pembelian).then(res => {
        this.setState({
          pembelian: [
            ...this.state.pembelian.filter(
                pembelian => pembelian.id !== id_pembelian
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_tanggal: "",
      txt_project_id: "",
      txt_supplier_id: "",
      txt_jumlah_beli: "",
      txt_tonase_beli: "",
      hint_stok_telur: "pilih project untuk mengetahui stok telur",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // if(parseInt(this.state.stok_telur) < parseInt(this.state.txt_jumlah_beli)){
    //   alert('Stok Telur Tidak Cukup !');
    //   return false;
    // }

    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          tanggal: this.state.txt_tanggal,
          project_id: this.state.txt_project_id,
          supplier_id: this.state.txt_supplier_id,
          produk_id: this.state.txt_produk_id,
          jumlah_beli: this.state.txt_jumlah_beli,
          tonase_beli: this.state.txt_tonase_beli
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              pembelian: [...this.state.pembelian, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      axios
        .put(this.API_URL + "/" + this.state.txt_id, {
          kategori_id: this.state.txt_kategori,
          nama_pembelian: this.state.txt_nama_pembelian,
          satuan: this.state.txt_satuan
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              pembelian: this.state.pembelian.map(prod => {
                if (prod.id === res.data.data.id) {
                  prod.kategori_id = res.data.data.pembelian_kategori.id;
                  prod.pembelian_kategori.id = res.data.data.pembelian_kategori.id;
                  prod.pembelian_kategori.nama = res.data.data.pembelian_kategori.nama;
                  prod.nama_pembelian = res.data.data.nama_pembelian;
                  prod.satuan = res.data.data.satuan;
                }
                return prod;
              })
            });
            console.log(this.state.pembelian);
            
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Pembelian
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="kategori-pembelian">Project</Label>
                        <Input type="select" name="txt_project_id" id="project" onChange={this.handleChange} value={this.state.txt_project_id} required>
                            <option value="">pilih project</option>
                            {this.state.arrProject.map((project, index) => 
                              <option key={index} value={project.id}>{project.kandang.name} (Periode{project.periode})</option>
                            )}
                        </Input>
                        {/* <FormText color="muted">{this.state.hint_stok_telur}</FormText> */}
                    </Col>
                    <Col md="4">
                      <Label htmlFor="kategori-pembelian">Supplier</Label>
                        <Input type="select" name="txt_supplier_id" id="supplier" onChange={this.handleChange} value={this.state.txt_supplier_id} required>
                            <option value="">pilih supplier</option>
                            {this.state.arrSupplier.map((supplier, index) => 
                              <option key={index} value={supplier.id}>{supplier.supplier_name}</option>
                            )}
                        </Input>
                    </Col>
                    <Col md="4">
                      <Label htmlFor="kategori-pembelian">Produk</Label>
                        <Input type="select" name="txt_produk_id" id="supplier" onChange={this.handleChange} value={this.state.txt_produk_id} required>
                            <option value="">pilih produk</option>
                            {this.state.arrProducts.map((produk, index) => 
                              <option key={index} value={produk.id}>{produk.nama_produk}</option>
                            )}
                        </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="nama-pembelian">Tanggal</Label>
                        <Input
                          type="text"
                          name="txt_tanggal"
                          onChange={this.handleChange}
                          value={this.state.txt_tanggal}
                          required
                          placeholder="Tanggal pembelian"
                        />
                      </Col>
                    <Col md="4">
                      <Label htmlFor="satuan-pembelian">Jumlah Beli</Label>
                      <Input
                        type="number"
                        name="txt_jumlah_beli"
                        onChange={this.handleChange}
                        value={this.state.txt_jumlah_beli}
                        required
                        placeholder="Jumlah beli"
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="satuan-pembelian">Tonase Beli</Label>
                      <Input
                        type="number"
                        name="txt_tonase_beli"
                        onChange={this.handleChange}
                        value={this.state.txt_tonase_beli}
                        required
                        placeholder="Tonase beli"
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>{" "}
                    {this.state.value_simpan}
                  </Button>
                  <Button size="sm" color="danger" onClick={this.cancelClick}>
                    <i className="fa fa-ban"></i> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Pembelian
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Project</th>
                      <th>Supplier</th>
                      <th>Produk</th>
                      <th>Jumlah</th>
                      <th>Tonase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pembelian.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.tanggal}</td>
                        <td>{row.project.kandang.name} (Periode{row.project.periode})</td>
                        <td>{row.supplier.supplier_name}</td>
                        <td>{row.pembelian_detail.produk.nama_produk}</td>
                        <td>{row.pembelian_detail.jumlah_beli}</td>
                        <td>{row.pembelian_detail.tonase_beli}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Pembelian;
