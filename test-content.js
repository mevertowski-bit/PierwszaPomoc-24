import fs from 'fs';
import path from 'path';

console.log('=== URUCHAMIAM DIAGNOSTYKĘ KROK PO KROKU ===\n');

const pathsToTest = {
  uslugi: path.resolve('src/content/uslugi'),
  blog: path.resolve('src/content/blog'),
  config: path.resolve('src/content.config.ts')
};

// 1. Sprawdzanie konfiguracji i folderów
for (const [key, targetPath] of Object.entries(pathsToTest)) {
  if (fs.existsSync(targetPath)) {
    console.log(`✅ Znaleziono ścieżkę dla [${key}]: ${targetPath}`);
    if (key !== 'config') {
      const files = fs.readdirSync(targetPath);
      console.log(`   -> Liczba plików w folderze: ${files.length}`);
      console.log(`   -> Lista plików: ${JSON.stringify(files)}\n`);
    }
  } else {
    console.log(`❌ BRAK ŚCIEŻKI dla [${key}]: ${targetPath}`);
    console.log(`   -> Upewnij się, czy folder/plik na pewno tam jest!\n`);
  }
}

// 2. Walidacja zawartości plików w kolekcji usługi
console.log('=== TEST INTEGRALNOŚCI PLIKÓW MDX (USŁUGI) ===');
if (fs.existsSync(pathsToTest.uslugi)) {
  const mdxFiles = fs.readdirSync(pathsToTest.uslugi).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  mdxFiles.forEach(file => {
    const fullPath = path.join(pathsToTest.uslugi, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Sprawdzenie struktury frontmatter
      if (!content.startsWith('---')) {
        console.log(`⚠️  Plik [${file}]: Brak poprawnego nagłówka '---' na samym początku pliku!`);
        return;
      }
      
      const parts = content.split('---');
      if (parts.length < 3) {
        console.log(`⚠️  Plik [${file}]: Nagłówek frontmatter nie jest poprawnie zamknięty drugą linią '---'!`);
        return;
      }
      
      const frontmatter = parts[1];
      console.log(`✅ Plik [${file}] jest czytelny.`);
      
      // Sprawdzenie niedozwolonych znaków w nagłówku
      if (frontmatter.includes('\t')) {
        console.log(`   ❌ BŁĄD: Nagłówek zawiera tabulatory (używaj spacji do wcięć YAML!).`);
      }
    } catch (err) {
      console.log(`❌ BŁĄD podczas odczytu pliku [${file}]:`, err.message);
    }
  });
}

console.log('\n=== DIAGNOSTYKA UKOŃCZONA ===');