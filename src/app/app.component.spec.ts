import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

import { expect } from '@jest/globals'

import { HarnessLoader } from '@angular/cdk/testing'
import { MatCardHarness } from '@angular/material/card/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let loader: HarnessLoader

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
      ],
    })
    fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    component = fixture.componentInstance
    loader = TestbedHarnessEnvironment.loader(fixture)
  })

  it('should create the app', () => {
    expect(component).toBeDefined()
  })

  it('should have as title "frontend"', async () => {
    await expect(component.title).toEqual('frontend')
  })

  it('should render properly', async () => {
    const mainCard: MatCardHarness = await loader.getHarness(MatCardHarness)
    await expect(mainCard.getTitleText()).resolves.toEqual(
      'Welcome, game masters!'
    )
    await expect(mainCard.getText()).resolves.toContain(
      "Hi, I'm here to help you live memorable experiences!"
    )
  })
})
