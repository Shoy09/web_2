import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGeneralEditorComponents } from './product-general-editor.component';

describe('ProductGeneralEditorComponent', () => {
  let component: ProductGeneralEditorComponents;
  let fixture: ComponentFixture<ProductGeneralEditorComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGeneralEditorComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGeneralEditorComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
