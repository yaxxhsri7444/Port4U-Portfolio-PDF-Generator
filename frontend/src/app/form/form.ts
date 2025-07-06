import { Component } from '@angular/core';
import { Portfolio } from '../portfolio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  skillsInput = '';
  formData = {
    name: '',
    bio: '',
    skills: [] as string[],
    projects: [{ title: '', link: '', description: '' }],
    contact: { email: '', github: '', linkedin: '' }
  };

  constructor(private portfolioService: Portfolio) {}

  addProject() {
    this.formData.projects.push({ title: '', link: '', description: '' });
  }

  generatePDF() {
    this.formData.skills = this.skillsInput.split(',').map(s => s.trim());
    this.portfolioService.downloadPDF(this.formData).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'portfolio.pdf';
      link.click();
    });
  }
}
