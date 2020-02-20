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

class Penjualan extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5000/penjualan";
    this.API_URL_CUSTOMERS = "http://localhost:5000/customers";
    this.API_URL_PROJECTS = "http://localhost:5000/projects";

    this.state = {
      penjualan: [],
      arrProject: [],
      arrCustomer: [],
      txt_tanggal: "",
      txt_project_id: "",
      txt_customer_id: "",
      txt_jumlah_jual: "",
      txt_tonase_jual: "",
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
      this.setState({ penjualan: res.data.data });
    });
    axios.get(this.API_URL_CUSTOMERS).then(res => {
      this.setState({arrCustomer: res.data.data})
    });
    axios.get(this.API_URL_PROJECTS + '/0').then(res => {
      this.setState({arrProject: res.data.data})
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if(e.target.name === 'txt_project_id'){
      this.hintTextStokTelur(e.target.value);
    }
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

  editClick = id_penjualan => {
    axios.get(this.API_URL + "/" + id_penjualan).then(res => {
      this.setState({
        txt_id: id_penjualan,
        txt_kategori: res.data.data.penjualan_kategori.id,
        txt_nama_penjualan: res.data.data.nama_penjualan,
        txt_satuan: res.data.data.satuan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_penjualan => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.delete(this.API_URL + "/" + id_penjualan).then(res => {
        this.setState({
          penjualan: [
            ...this.state.penjualan.filter(
                penjualan => penjualan.id !== id_penjualan
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
      txt_customer_id: "",
      txt_jumlah_jual: "",
      txt_tonase_jual: "",
      hint_stok_telur: "pilih project untuk mengetahui stok telur",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if(parseInt(this.state.stok_telur) < parseInt(this.state.txt_jumlah_jual)){
      alert('Stok Telur Tidak Cukup !');
      return false;
    }

    if (this.state.txt_id === "") {
      axios
        .post(this.API_URL, {
          tanggal: this.state.txt_tanggal,
          project_id: this.state.txt_project_id,
          customer_id: this.state.txt_customer_id,
          jumlah_jual: this.state.txt_jumlah_jual,
          tonase_jual: this.state.txt_tonase_jual
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              penjualan: [...this.state.penjualan, res.data.data]
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
          nama_penjualan: this.state.txt_nama_penjualan,
          satuan: this.state.txt_satuan
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              penjualan: this.state.penjualan.map(prod => {
                if (prod.id === res.data.data.id) {
                  prod.kategori_id = res.data.data.penjualan_kategori.id;
                  prod.penjualan_kategori.id = res.data.data.penjualan_kategori.id;
                  prod.penjualan_kategori.nama = res.data.data.penjualan_kategori.nama;
                  prod.nama_penjualan = res.data.data.nama_penjualan;
                  prod.satuan = res.data.data.satuan;
                }
                return prod;
              })
            });
            console.log(this.state.penjualan);
            
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
                <i className="fa fa-align-justify"></i> Form Penjualan
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="kategori-penjualan">Project</Label>
                        <Input type="select" name="txt_project_id" id="project" onChange={this.handleChange} value={this.state.txt_project_id} required>
                            <option value="">pilih project</option>
                            {this.state.arrProject.map((project, index) => 
                              <option key={index} value={project.id}>{project.kandang.name} (Periode{project.periode})</option>
                            )}
                        </Input>
                        <FormText color="muted">{this.state.hint_stok_telur}</FormText>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="kategori-penjualan">Customer</Label>
                        <Input type="select" name="txt_customer_id" id="customer" onChange={this.handleChange} value={this.state.txt_customer_id} required>
                            <option value="">pilih customer</option>
                            {this.state.arrCustomer.map((customer, index) => 
                              <option key={index} value={customer.id}>{customer.customer_name}</option>
                            )}
                        </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="nama-penjualan">Tanggal</Label>
                        <Input
                          type="text"
                          name="txt_tanggal"
                          onChange={this.handleChange}
                          value={this.state.txt_tanggal}
                          required
                          placeholder="Tanggal Penjualan"
                        />
                      </Col>
                    <Col md="4">
                      <Label htmlFor="satuan-penjualan">Jumlah Jual</Label>
                      <Input
                        type="number"
                        name="txt_jumlah_jual"
                        onChange={this.handleChange}
                        value={this.state.txt_jumlah_jual}
                        required
                        placeholder="Jumlah Jual"
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="satuan-penjualan">Tonase Jual</Label>
                      <Input
                        type="number"
                        name="txt_tonase_jual"
                        onChange={this.handleChange}
                        value={this.state.txt_tonase_jual}
                        required
                        placeholder="Tonase Jual"
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
                <i className="fa fa-align-justify"></i> Data Penjualan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Project</th>
                      <th>Customer</th>
                      <th>Jumlah</th>
                      <th>Tonase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.penjualan.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.tanggal}</td>
                        <td>{row.project.kandang.name} (Periode{row.project.periode})</td>
                        <td>{row.customer.customer_name}</td>
                        <td>{row.penjualan_detail.jumlah_jual}</td>
                        <td>{row.penjualan_detail.tonase_jual}</td>
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

export default Penjualan;
