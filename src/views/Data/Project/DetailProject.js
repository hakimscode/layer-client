import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ListGroup, ListGroupItem, Badge, Table
  } from "reactstrap";
  import axios from "axios";

class DetailProject extends Component {
    constructor(props){
      super(props);

      this.API_URL = "http://localhost:5000/project";
      this.projectId = this.props.match.params.projectId;

      this.state = {
          detailProject: {
              id: "",
              kandang_id: "",
              periode: "",
              populasi_awal: "",
              tanggal_mulai: "",
              tanggal_closing: "",
              status: "",
              kandang: {
                  id: "",
                  code: "",
                  name: "",
                  alamat: ""
              },
              project_recording_harians:[
                  {
                      tanggal: "",
                      hari: "",
                      pakan: "",
                      jumlah_telur: "",
                      tonase_telur: ""
                  }
              ]
          },
          totalPakan: 0,
          totalJumlah: 0,
          totalTonase: 0,
          txt_hari: "",
          txt_pakan: "",
          txt_jumlah_telur: "",
          txt_tonase_telur: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.cancelClick = this.cancelClick.bind(this);
    }

    componentDidMount() {
        axios.get(this.API_URL + "/" + this.projectId).then(res => {
            this.setState({detailProject: res.data.data});
            let totalPakan = 0;
            let totalJumlah = 0;
            let totalTonase = 0;
            res.data.data.project_recording_harians.forEach(recording => {
                totalPakan += recording.pakan;
                totalJumlah += recording.jumlah_telur;
                totalTonase += recording.tonase_telur;
            });
            this.setState({totalPakan, totalJumlah, totalTonase});
        })
    }

    cancelClick = () => {
      this.setState({
        txt_id: "",
        txt_hari: "",
        txt_pakan: "",
        txt_jumlah_telur: "",
        txt_tonase_telur: ""
      });
    };

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault();
      axios
        .post(this.API_URL + '/recording_harian', {
          project_id: this.projectId,
          hari: this.state.txt_hari,
          pakan: this.state.txt_pakan,
          jumlah_telur: this.state.txt_jumlah_telur,
          tonase_telur: this.state.txt_tonase_telur
        })
        .then(res => {
          if (res.status === 200) {
            this.setState(prevState => {
              let detailProject = Object.assign({}, prevState.detailProject);
              detailProject.project_recording_harians = [...this.state.detailProject.project_recording_harians, res.data.data]
              return {detailProject}
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    }

    statusProject = (status) => {
      if (status === 0){
        return <Badge color="secondary">Sedang Berjalan</Badge>
      }else{
        return <Badge color="success">Sudah Closing</Badge>
      }
    }

    render() {
        return (
          <div className="animated fadeIn">
            <Row>
                <Col xs="12" lg="6">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i>Data Project
                        <div className="card-header-actions">
                            {this.statusProject(this.state.detailProject.status)}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="6" md="6">
                                <ListGroup>
                                    <ListGroupItem>{this.state.detailProject.kandang.name} - Periode {this.state.detailProject.periode}</ListGroupItem>
                                    <ListGroupItem>Populasi Awal : {this.state.detailProject.populasi_awal} ekor</ListGroupItem>
                                    <ListGroupItem>Tgl Mulai : {this.state.detailProject.tanggal_mulai}</ListGroupItem>
                                    <ListGroupItem>Tgl Closing : {this.state.detailProject.tanggal_closing}</ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col xs="6" md="6">
                                <ListGroup>
                                <ListGroupItem>Hari Produksi : {this.state.detailProject.project_recording_harians.length} hari</ListGroupItem>
                                <ListGroupItem>Total Pakan : {this.state.totalPakan} kg</ListGroupItem>
                                <ListGroupItem>Total Telur : {this.state.totalJumlah} butir</ListGroupItem>
                                <ListGroupItem>Total Tonase Telur : {this.state.totalTonase} kg</ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
              </Col>
              <Col xs="12" lg="6">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Form Data Harian
                  </CardHeader>
                  <Form onSubmit={this.handleSubmit}>
                    <CardBody>
                      <FormGroup row>
                        <Col md="2">
                          <Label htmlFor="kategori-produk">Hari</Label>
                        </Col>
                        <Col xs="4" md="4">
                          <Input
                            type="number"
                            name="txt_hari"
                            onChange={this.handleChange}
                            value={this.state.txt_hari}
                            required
                            placeholder="Hari"
                          />
                        </Col>
                        <Col md="2">
                          <Label htmlFor="kategori-produk">Jumlah Pakan</Label>
                        </Col>
                        <Col xs="4" md="4">
                          <Input
                            type="number"
                            name="txt_pakan"
                            onChange={this.handleChange}
                            value={this.state.txt_pakan}
                            required
                            placeholder="Jumlah Pakan"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2">
                          <Label htmlFor="kategori-produk">Jumlah Telur</Label>
                        </Col>
                        <Col xs="4" md="4">
                          <Input
                            type="number"
                            name="txt_jumlah_telur"
                            onChange={this.handleChange}
                            value={this.state.txt_jumlah_telur}
                            required
                            placeholder="Jumlah Telur"
                          />
                        </Col>
                        <Col md="2">
                          <Label htmlFor="kategori-produk">Tonase Telur</Label>
                        </Col>
                        <Col xs="4" md="4">
                          <Input
                            type="number"
                            name="txt_tonase_telur"
                            onChange={this.handleChange}
                            value={this.state.txt_tonase_telur}
                            required
                            placeholder="Tonase Telur"
                          />
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i>{" "}
                        Simpan
                      </Button>
                      &nbsp;
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
                    <i className="fa fa-align-justify"></i> Data Harian
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Hari</th>
                          <th>Pakan</th>
                          <th>Jumlah Telur</th>
                          <th>Tonase Telur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.detailProject.project_recording_harians.map((row) => (
                          <tr key={row.id}>
                            <td>{row.hari}</td>
                            <td>{row.pakan}</td>
                            <td>{row.jumlah_telur}</td>
                            <td>{row.tonase_telur}</td>
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

export default DetailProject;