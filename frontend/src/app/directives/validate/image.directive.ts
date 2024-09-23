import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const allowedMimeTypes = ['image/png', 'image/jpeg'];

      if (!allowedMimeTypes.includes(file.type)) {
        // alert('Invalid image type. Only PNG and JPG are allowed.');
        Swal.fire({
          icon: "error",
          title: "Invalid image type",
          text: "Only PNG and JPG are allowed.",
          showConfirmButton: true,
        });
        // Reset the file input
        this.renderer.setProperty(this.el.nativeElement, 'value', '');
      }
    }
  }
}
