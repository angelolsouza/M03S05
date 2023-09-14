import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.css']
})
export class ModalFormularioComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  usuarioForm!: FormGroup;

  constructor(private activeModal: NgbActiveModal, private http: HttpClient) {}

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      dtNascimento: new FormControl(''),
    });
  }

  enviar() {
    //url do endpoint a ser chamado
    const url = 'https://localhost:7081/';

    //construção do objeto para envio
    //const body = this.usuarioForm.value;
    const body = {
      nomeCompleto: this.usuarioForm.value.nome,
      emailInformado: this.usuarioForm.value.email,
      dataDeNascimento: this.usuarioForm.value.dtNascimento
    }
    this.http.post(url, body).subscribe(retorno => {
      //rotina
      console.log(retorno);
    })
  }

  fecharModal() {
    this.closeModal?.emit();
  }

  //somente funciona quando a modal for aberta a partir do component
  fechar() {
    this.activeModal.close();
  }
}
