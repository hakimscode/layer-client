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

class KategoriProduk extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/produk_kategori";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      kt_produk: [
        {
          id: "",
          nama: ""
        }
      ],
      txt_nama: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ kt_produk: res.data.data });
    });
  }

  handleChange = e => {
    this.setState({
      txt_nama: e.target.value
    });
  };

  editClick = id_kategori => {
    axios.get(this.API_URL + "/" + id_kategori).then(res => {
      this.setState({
        txt_id: id_kategori,
        txt_nama: res.data.data.nama,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_kategori => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + id_kategori).then(res => {
        this.setState({
          kt_produk: [
            ...this.state.kt_produk.filter(
                kategori => kategori.id !== id_kategori
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_nama: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          nama: this.state.txt_nama
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              kt_produk: [...this.state.kt_produk, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/" + this.state.txt_id, {
          nama: this.state.txt_nama
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              kt_produk: this.state.kt_produk.map(row_kel => {
                if (row_kel.id === res.data.data.id) {
                  row_kel.nama = res.data.data.nama;
                }
                return row_kel;
              })
            });
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
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Kategori Produk
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kategori Produk</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.kt_produk.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.nama}</td>
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

          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Kategori Produk
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="kategori-produk">Kategori Produk</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.txt_nama}
                        required
                        placeholder="Kategori Produk"
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
        </Row>
      </div>
    );
  }
}

export default KategoriProduk;
