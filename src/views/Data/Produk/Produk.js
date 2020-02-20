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
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class Produk extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/produk";
    this.API_URL_KATEGORI = "http://localhost:5000/produk_kategori";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      produk: [],
      arrKategori: [],
      txt_kategori: "",
      txt_nama_produk: "",
      txt_satuan: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ produk: res.data.data });
    });
    axios.get(this.API_URL_KATEGORI).then(res => {
      this.setState({arrKategori: res.data.data})
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = id_produk => {
    axios.get(this.API_URL + "/" + id_produk).then(res => {
      this.setState({
        txt_id: id_produk,
        txt_kategori: res.data.data.produk_kategori.id,
        txt_nama_produk: res.data.data.nama_produk,
        txt_satuan: res.data.data.satuan,
        value_simpan: "Edit"
      });
    });
    console.log(this.state.produk);
    
  };

  hapusClick = id_produk => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + id_produk).then(res => {
        this.setState({
          produk: [
            ...this.state.produk.filter(
                produk => produk.id !== id_produk
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_kategori: "",
      txt_nama_produk: "",
      txt_satuan: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          kategori_id: this.state.txt_kategori,
          nama_produk: this.state.txt_nama_produk,
          satuan: this.state.txt_satuan
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              produk: [...this.state.produk, res.data.data]
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
          nama_produk: this.state.txt_nama_produk,
          satuan: this.state.txt_satuan
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              produk: this.state.produk.map(prod => {
                if (prod.id === res.data.data.id) {
                  prod.kategori_id = res.data.data.produk_kategori.id;
                  prod.produk_kategori.id = res.data.data.produk_kategori.id;
                  prod.produk_kategori.nama = res.data.data.produk_kategori.nama;
                  prod.nama_produk = res.data.data.nama_produk;
                  prod.satuan = res.data.data.satuan;
                }
                return prod;
              })
            });
            console.log(this.state.produk);
            
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
                <i className="fa fa-align-justify"></i> Form Produk
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="kategori-produk">Kategori Produk</Label>
                    </Col>
                    <Col xs="4" md="4">
                        <Input type="select" name="txt_kategori" id="kategori_produk" onChange={this.handleChange} value={this.state.txt_kategori} required>
                            <option value="">pilih kategori produk</option>
                            {this.state.arrKategori.map((kategori, index) => 
                              <option key={index} value={kategori.id}>{kategori.nama}</option>
                            )}
                        </Input>
                    </Col>
                    <Col md="2">
                      <Label htmlFor="nama-produk">Nama Produk</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_nama_produk"
                        onChange={this.handleChange}
                        value={this.state.txt_nama_produk}
                        required
                        placeholder="Nama Produk"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="satuan-produk">Satuan Produk</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_satuan"
                        onChange={this.handleChange}
                        value={this.state.txt_satuan}
                        required
                        placeholder="Satuan Produk"
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
                <i className="fa fa-align-justify"></i> Data Produk
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kategori Produk</th>
                      <th>Produk</th>
                      <th>Satuan</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.produk.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.produk_kategori.nama}</td>
                        <td>{row.nama_produk}</td>
                        <td>{row.satuan}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_kategori={row.id}
                            onClick={this.hapusClick.bind(this, row.id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            id_kategori={row.id}
                            onClick={this.editClick.bind(this, row.id)}
                          >
                            Edit
                          </Button>
                        </td>
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

export default Produk;
