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

class Customers extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/customers";
    // this.API_URL = "https://api.fawwazlab.com/lapor/api/jenis_laporan";

    this.state = {
      customers: [
        {
          id: "",
          customer_code: "",
          customer_name: "",
          address: ""
        }
      ],

      txt_customer_code: "",
      txt_customer_name: "",
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
      this.setState({ customers: res.data.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = customerId => {
    axios.get(this.API_URL + "/" + customerId).then(res => {
      this.setState({
        txt_id: customerId,
        txt_customer_code: res.data.data.customer_code,
        txt_customer_name: res.data.data.customer_name,
        txt_address: res.data.data.address,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = customerId => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + customerId).then(res => {
        this.setState({
          customers: [
            ...this.state.customers.filter(
                customer => customer.id !== customerId
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_customer_code: "",
      txt_customer_name: "",
      txt_address: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          customer_code: this.state.txt_customer_code,
          customer_name: this.state.txt_customer_name,
          address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
                customers: [...this.state.customers, res.data.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/" + this.state.txt_id, {
            customer_code: this.state.txt_customer_code,
            customer_name: this.state.txt_customer_name,
            address: this.state.txt_address
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              customer: this.state.customers.map(customer => {
                if (customer.id === res.data.data.id) {
                  customer.customer_code = res.data.data.customer_code;
                  customer.customer_name = res.data.data.customer_name;
                  customer.address = res.data.data.address;
                }
                return customer;
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
                <i className="fa fa-align-justify"></i> Form Customer
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                  <Col md="2">
                      <Label htmlFor="nama-produk">Kode Customer</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_customer_code"
                        onChange={this.handleChange}
                        value={this.state.txt_customer_code}
                        required
                        placeholder="Kode Customer"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="nama-produk">Nama Customer</Label>
                    </Col>
                    <Col xs="4" md="4">
                      <Input
                        type="text"
                        name="txt_customer_name"
                        onChange={this.handleChange}
                        value={this.state.txt_customer_name}
                        required
                        placeholder="Nama Customer"
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
                <i className="fa fa-align-justify"></i> Data Customer
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode customer</th>
                      <th>Nama customer</th>
                      <th>Alamat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customers.map((customer, index) => (
                      <tr key={customer.id}>
                        <td>{index + 1}</td>
                        <td>{customer.customer_code}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            id_kategori={customer.id}
                            onClick={this.hapusClick.bind(this, customer.id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            id_kategori={customer.id}
                            onClick={this.editClick.bind(this, customer.id)}
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

export default Customers;
