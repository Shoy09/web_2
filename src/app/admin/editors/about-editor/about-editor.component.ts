import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AboutService } from '../../../services/about.service';
import { AboutSection } from '../../../models/about.model';
import { Subscription } from 'rxjs';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-about-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatExpansionModule
  ],
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent implements OnInit, OnDestroy {

  aboutForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();

    // 🔥 Detectar cambios automáticamente
    this.aboutForm.valueChanges.subscribe(() => {
      this.aboutForm.markAsDirty();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.aboutForm = this.fb.group({
      hero: this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]]
      }),
      subtitle: this.fb.group({
        text: ['', Validators.maxLength(200)]
      }),
      paragraphs: this.fb.array([]),
      paragraphs2: this.fb.array([])
    });
  }

  private loadData(): void {
    const data = this.aboutService.getAbout();
    this.updateFormWithData(data);
    this.subscription.add(
      this.aboutService.aboutData$.subscribe(d => {
        if (d) this.updateFormWithData(d);
      })
    );
  }

  private updateFormWithData(data: AboutSection): void {
    this.clearFormArray(this.paragraphsArray);
    this.clearFormArray(this.paragraphs2Array);

    this.aboutForm.patchValue({
      hero: { title: data.heroTitle || '' },
      subtitle: { text: data.subtitle || '' }
    });

    // 🟢 Párrafos principales (SIN required para evitar bloqueo)
    if (data.paragraphs && data.paragraphs.length > 0) {
      data.paragraphs.forEach(p => {
        this.paragraphsArray.push(
          this.fb.control(p || '', [Validators.maxLength(500)])
        );
      });
    } else {
      this.paragraphsArray.push(
        this.fb.control('', [Validators.maxLength(500)])
      );
    }

    // 🟢 Párrafos secundarios
    if (data.paragraphs2 && data.paragraphs2.length > 0) {
      data.paragraphs2.forEach(p => {
        this.paragraphs2Array.push(
          this.fb.control(p || '', [Validators.maxLength(500)])
        );
      });
    }

    this.aboutForm.markAsPristine();
  }

  private clearFormArray(arr: FormArray): void {
    while (arr.length) arr.removeAt(0);
  }

  // Getters
  get paragraphsArray(): FormArray {
    return this.aboutForm.get('paragraphs') as FormArray;
  }

  get paragraphs2Array(): FormArray {
    return this.aboutForm.get('paragraphs2') as FormArray;
  }

  get heroTitleControl(): AbstractControl | null {
    return this.aboutForm.get('hero.title');
  }

  get subtitleTextControl(): AbstractControl | null {
    return this.aboutForm.get('subtitle.text');
  }

  trackByIndex(index: number): number {
    return index;
  }

  getCharacterCount(control: AbstractControl | null): number {
    return control?.value?.length || 0;
  }

  // 🔵 Agregar párrafos
  addParagraph(): void {
    this.paragraphsArray.push(
      this.fb.control('', [Validators.maxLength(500)])
    );
    this.aboutForm.markAsDirty();
  }

  removeParagraph(index: number): void {
    if (this.paragraphsArray.length > 1) {
      this.paragraphsArray.removeAt(index);
      this.aboutForm.markAsDirty();
    }
  }

  addParagraph2(): void {
    this.paragraphs2Array.push(
      this.fb.control('', [Validators.maxLength(500)])
    );
    this.aboutForm.markAsDirty();
  }

  removeParagraph2(index: number): void {
    this.paragraphs2Array.removeAt(index);
    this.aboutForm.markAsDirty();
  }

  // 🟢 BOTÓN SIEMPRE ACTIVO
  canSave(): boolean {
    return true;
  }

  // 🔥 GUARDAR
  saveChanges(): void {
    console.log('=== GUARDANDO ===');

    try {
      const updated: AboutSection = {
        heroTitle: this.aboutForm.get('hero.title')?.value || '',
        subtitle: this.aboutForm.get('subtitle.text')?.value || '',
        paragraphs: this.paragraphsArray.value.filter((p: string) => p?.trim() !== ''),
        paragraphs2: this.paragraphs2Array.value.filter((p: string) => p?.trim() !== '')
      };

      console.log('Datos a guardar:', updated);

      this.aboutService.updateAbout(updated);
      this.aboutForm.markAsPristine();

      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);

      console.log('Guardado OK');

    } catch (error) {
      console.error(error);
      this.showErrorMessage = true;
      setTimeout(() => this.showErrorMessage = false, 3000);
    }
  }

  resetForm(): void {
    const data = this.aboutService.getAbout();
    this.updateFormWithData(data);
    this.aboutForm.markAsPristine();
    this.aboutForm.markAsUntouched();
  }
}
