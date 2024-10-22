import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-edit-animals',
  templateUrl: './edit-animals.component.html',
  styleUrls: ['./edit-animals.component.css']
})
export class EditAnimalsComponent implements OnInit {
  param: any;
  imageFile: any;

  constructor(private _ser: RawaahServicesService, private _active: ActivatedRoute) {
    // الحصول على id من الـ URL
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // يمكن إضافة منطق لتحميل بيانات الحيوان باستخدام هذا المعرف هنا
  }

  changeImageEvent(event: any) {
    this.imageFile = event.target.files[0];
  }

  UpdateAnimalsAdmin(data: any) {
    const form = new FormData();

    // إضافة جميع بيانات الحيوان إلى النموذج
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        form.append(key, data[key]);
      }
    }

    // إضافة صورة الحيوان إذا كانت موجودة
    if (this.imageFile) {
      form.append("ServiceImage", this.imageFile);
    }

    // استدعاء خدمة تحديث الحيوان
    this._ser.UpdateAnimalsAdmin(this.param, form).subscribe({
      next: (response) => {
        alert("Animal Updated Successfully");
      },
      error: (error) => {
        console.error("Error updating animal:", error);
        alert("An error occurred while updating the animal.");
      }
    });
  }
}
