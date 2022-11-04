import { LogLevel } from 'typescript-logging';
import { CategoryProvider } from 'typescript-logging-category-style';

const provider = CategoryProvider.createProvider('ExampleProvider', {
  level: LogLevel.Debug,
});

export const logger = provider.getCategory('main');
