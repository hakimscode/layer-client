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

class Suppliers extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/suppliers";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      suppliers: [],

      txt_supplier_code: "",
      txt_supplier_name: "",
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
      this.setState({ suppliers: res.data.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = supplierId => {
    axios.get(this.API_URL + "/" + supplierId).then(res => {
      this.setState({
        txt_id: supplierId,
        txt_supplier_code: res.data.data.supplier_code,
        txt_supplier_name: res.data.data.supplier_name,
        txt_address: res.data.data.address,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = supplierId => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + supplierId).then(res => {
        this.setState({
          suppliers: [
            ...this.state.suppliers.filter(
                supplier => supplier.id !== supplierId
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_supplier_code: "",
      txt_supplier_name: "",
      txt_address: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          supplier_code: this.state.txt_supplier_code,
          supplier_name: this.state.txt_supplier_name,
          address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
                suppliers: [...this.state.suppliers, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/" + this.state.txt_id, {
            supplier_code: this.state.txt_supplier_code,
            supplier_name: this.state.txt_supplier_name,
            address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              supplier: this.state.suppliers.map(supplier => {
                if (supplier.id === res.data.data.id) {
                  supplier.supplier_code = res.data.data.supplier_code;
                  supplier.supplier_name = res.data.data.supplier_name;
                  supplier.address = res.data.data.address;
                }
                return supplier;
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
                <i className="fa fa-align-justify"></i> Form Supplier
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                  <Col md="2">
                      <Label htmlFor="nama-produk">Kode Supplier</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_supplier_code"
                        onChange={this.handleChange}
                        value={this.state.txt_supplier_code}
                        required
                        placeholder="Kode Supplier"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="nama-produk">Nama Supplier</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_supplier_name"
                        onChange={this.handleChange}
                        value={this.state.txt_supplier_name}
                        required
                        placeholder="Nama Supplier"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
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
                <i className="fa fa-align-justify"></i> Data Supplier
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Supplier</th>
                      <th>Nama Supplier</th>
                      <th>Alamat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.suppliers.map((supplier, index) => (
                      <tr key={supplier.id}>
                        <td>{index + 1}</td>
                        <td>{supplier.supplier_code}</td>
                        <td>{supplier.supplier_name}</td>
                        <td>{supplier.address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_kategori={supplier.id}
                            onClick={this.hapusClick.bind(this, supplier.id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            id_kategori={supplier.id}
                            onClick={this.editClick.bind(this, supplier.id)}
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

export default Suppliers;
