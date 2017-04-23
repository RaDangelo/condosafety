import { Component } from '@angular/core';

import { PessoaModel } from './models';
import { PessoaServiceInterface } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // images:Array<Object> = [];

  pessoa: PessoaModel;
  mensagemRetorno: string;

  constructor(private pessoaService: PessoaServiceInterface) {
    this.pessoa = new PessoaModel();
  }

  savePessoa() {
    this.pessoaService.save(this.pessoa)
      .subscribe((data: string) =>
        this.mensagemRetorno = data,
      (error) => {
        console.log('Ocorreu um erro!');
        alert(error);
      },
      () => {
        console.log('Pessoa salva com sucesso!');
        alert(this.mensagemRetorno);
      });
  }


  // handleDrop(e) {
  //   var files:File = e.dataTransfer.files;
  //   var self = this;
  //   Object.keys(files).forEach((key) => {
  //     if(files[key].type === "image/png" || files[key].type === "image/jpeg") {
  //       self.images.push(files[key]);
  //     }
  //     else {
  //       alert("File must be a PNG or JPEG!");
  //     }
  //   });

  //   return false;
  // }

  // imageStats() {

  //   let sizes:Array<number> = [];
  //   let totalSize:number = 0;

  //   this
  //     .images
  //     .forEach((image:File) => sizes.push(image.size));

  //   sizes
  //     .forEach((size:number) => totalSize += size);

  //   return {
  //     size: totalSize,
  //     count: this.images.length
  //   }

  // }
}
