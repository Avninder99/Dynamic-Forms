import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-response-sheet',
  templateUrl: './response-sheet.component.html',
  styleUrls: ['./response-sheet.component.css']
})
export class ResponseSheetComponent implements OnInit {

  responseService = inject(ResponseService);
  route = inject(ActivatedRoute);
  formatedResponseData: any = [];
  formatedResponseDataForSheets: any = [];
  loading = true;
  showError = false;
  fetchedForm: any;

  displayedColumns: string[] = ['Sr No', 'name', 'email'];
  sheetHeader: string[] = ['Sr No', 'name', 'email'];

  responseSheet: xlsx.WorkSheet;

  ngOnInit() {
    const formId = this.route.snapshot.params['id'];
    console.log(formId);
    this.responseService.fetchFormResponses(formId).subscribe(
      (res: any) => {
        console.log(res);
        this.fetchedForm = res.form;

        res.form.fields.forEach((field) => {
          this.displayedColumns.push(field.id);
          this.sheetHeader.push(field.question);
        })

        // Iterates responses and create Object to be inserted in formatedResponsesData
        // now also generate data for formatedResponseDataForSheets
        res.responses.forEach((response, resIndex) => {

          let obj: any = {
            'Sr No': resIndex + 1, 
            name: response.submittedBy.fullname,
            email: response.submittedBy.email
          };

          let sheetRowObj: any = {
            'Sr No': resIndex + 1,
            name: response.submittedBy.fullname,
            email: response.submittedBy.email
          }

          response.fields.forEach((field, index) => {
            if(typeof field.answer[0] === 'object'){
              const answerArray: string[] = [];
              Object.keys(field.answer[0]).forEach((optionName: string) => {
                if(field.answer[0][optionName]){
                  answerArray.push(optionName);
                }
              })
              obj[field.id] = answerArray.join(', ');
              sheetRowObj[res.form.fields[index].question] = answerArray.join(', ');
            }else {
              obj[field.id] = field.answer[0];
              sheetRowObj[res.form.fields[index].question] = field.answer[0];
            }
          })
          this.formatedResponseData.push(obj);
          this.formatedResponseDataForSheets.push(sheetRowObj);
        });
        this.loading = false;
      },
      (errorRes) => {
        console.log(errorRes);
        this.showError = true;
        this.loading = false;
      }
    )
  }

  exportToExcel() {
    this.responseSheet = xlsx.utils.json_to_sheet(this.formatedResponseDataForSheets, { header: this.sheetHeader });
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, this.responseSheet, 'Responses');
    const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, `${this.fetchedForm.title} Responses`);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }


}
