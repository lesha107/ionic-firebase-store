import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './core/components/core.component';

@NgModule({
  imports: [CoreModule],
  bootstrap: [CoreComponent],
})
export class AppModule {}
