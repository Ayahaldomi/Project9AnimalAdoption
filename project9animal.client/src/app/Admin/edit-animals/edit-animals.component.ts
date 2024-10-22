import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-edit-animals',
  templateUrl: './edit-animals.component.html',
  styleUrl: './edit-animals.component.css'
})
export class EditAnimalsComponent {
  ogOnInit() { }
  param: any
  imageFile: any
  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0]
  }
  constructor(private _ser: RawaahServicesService, private _active: ActivatedRoute) {
    this.param = this._active.snapshot.paramMap.get('id');
  }
  //الان بدي أجيب الid  من ال  url
  //   كيف رح اجيبه : بروح على كونستركتر بعرف  اندر سكوراكتيف
  //كولون اكتيفاتيد راوت بعدين بروح على الان جي ما بروح على الفنكشن نفسه  لانه بدي اعمل سناب شات بحيث اوخد الاي دي اول ما ادخل على الصفحة



  //UpdateAnimalsAdmin(data: any) {
  //  var form = new FormData();
  //  for (let key in data) {
  //    form.append(key, data[key])
  //  }
  //  form.append("ServiceImage", this.imageFile)
  //  this._ser.UpdateAnimalsAdmin(this.param, form).subscribe((data) => {
  //    alert("Services Updated Sucessfully")
  //  })
  //}
}

