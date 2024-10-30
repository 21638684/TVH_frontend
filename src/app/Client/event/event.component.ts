import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{
  eventForm!: FormGroup;  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      date: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('Form Submitted:', this.eventForm.value);
      // Logic to submit form data to the backend
    } else {
      console.log('Form is invalid');
    }
  }
}
     
