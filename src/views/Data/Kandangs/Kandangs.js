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

class Kandangs extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/kandangs";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      kandangs: [
        {
          id: "",
          code: "",
          name: "",
          population: "",
          address: ""
        }
      ],

      txt_code: "",
      txt_name: "",
      txt_population: "",
      txt_address: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ kandangs: res.data.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = kandangId => {
    axios.get(this.API_URL + "/" + kandangId).then(res => {
      this.setState({
        txt_id: kandangId,
        txt_code: res.data.data.code,
        txt_name: res.data.data.name,
        txt_population: res.data.data.population,
        txt_address: res.data.data.address,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = kandangId => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + kandangId).then(res => {
        this.setState({
          kandangs: [
            ...this.state.kandangs.filter(
                kandang => kandang.id !== kandangId
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_code: "",
      txt_name: "",
      txt_population: "",
      txt_address: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          code: this.state.txt_code,
          name: this.state.txt_name,
          population: this.state.txt_population,
          address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
                kandangs: [...this.state.kandangs, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/" + this.state.txt_id, {
            code: this.state.txt_code,
            name: this.state.txt_name,
            population: this.state.txt_population,
            address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              kandang: this.state.kandangs.map(kandang => {
                if (kandang.id === res.data.data.id) {
                  kandang.code = res.data.data.code;
                  kandang.name = res.data.data.name;
                  kandang.population = res.data.data.population;
                  kandang.address = res.data.data.address;
                }
                return kandang;
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
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Kandang
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                  <Col md="2">
                      <Label htmlFor="nama-produk">Kode Kandang</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_code"
                        onChange={this.handleChange}
                        value={this.state.txt_code}
                        required
                        placeholder="Kode kandang"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="nama-produk">Nama Kandang</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_name"
                        onChange={this.handleChange}
                        value={this.state.txt_name}
                        required
                        placeholder="Nama kandang"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="satuan-produk">Populasi</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="number"
                        name="txt_population"
                        onChange={this.handleChange}
                        value={this.state.txt_population}
                        required
                        placeholder="Populasi"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="satuan-produk">Alamat</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_address"
                        onChange={this.handleChange}
                        value={this.state.txt_address}
                        required
                        placeholder="Alamat"
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
                <i className="fa fa-align-justify"></i> Data Kandang
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode kandang</th>
                      <th>Nama kandang</th>
                      <th>Populasi</th>
                      <th>Alamat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.kandangs.map((kandang, index) => (
                      <tr key={kandang.id}>
                        <td>{index + 1}</td>
                        <td>{kandang.code}</td>
                        <td>{kandang.name}</td>
                        <td>{kandang.population}</td>
                        <td>{kandang.address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_kategori={kandang.id}
                            onClick={this.hapusClick.bind(this, kandang.id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            id_kategori={kandang.id}
                            onClick={this.editClick.bind(this, kandang.id)}
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

export default Kandangs;
