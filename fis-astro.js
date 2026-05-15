import fs from 'fs';
import path from 'path';

const filesToFix = [
  {
    filePath: 'src/pages/eventy.astro',
    content: `---
import { getEntry } from 'astro:content';
import SubpageLayout from '../layouts/SubpageLayout.astro';

const entry = await getEntry('templates', 'eventy');

let Content = null;
if (entry) {
    const rendered = await entry.render();
    Content = rendered.Content;
}
---

<SubpageLayout title="Eventy z pierwszą pomocą" currentPage="Eventy">
  {Content ? <Content /> : <p class="text-slate-400 italic p-8 bg-slate-900/50 rounded-lg text-center">Opis eventów i wydarzeń jest w trakcie przygotowania...</p>}
</SubpageLayout>`
  },
  {
    filePath: 'src/pages/kontakt.astro',
    content: `---
import { getEntry } from 'astro:content';
import SubpageLayout from '../layouts/SubpageLayout.astro';

const entry = await getEntry('templates', 'kontakt');

let Content = null;
if (entry) {
    const rendered = await entry.render();
    Content = rendered.Content;
}
---

<SubpageLayout title="Kontakt z nami" currentPage="Kontakt">
  {Content ? <Content /> : <p class="text-slate-400 italic p-8 bg-slate-900/50 rounded-lg text-center">Dane kontaktowe oraz formularz są w trakcie przygotowania...</p>}
</SubpageLayout>`
  },
  {
    filePath: 'src/pages/blog.astro',
    content: `---
import { getCollection } from "astro:content"
import Main from "../components/Main.astro"
import Layout from "../layouts/Layout.astro"
import BlogList from "../components/BlogList.astro"
import Header from "../components/Header.astro"

let posts = [];
try {
	posts = await getCollection("blog");
} catch (e) {
	posts = [];
}
---

<Layout title="Blog | PierwszaPomoc-24">
	<Main>
		<Header 
			title="PierwszaPomoc-24 Blog" 
			currentPage="Blog" 
		/>
		{posts && posts.length > 0 ? (
			<BlogList posts={posts} />
		) : (
			<div class="max-w-4xl mx-auto my-12 p-8 bg-slate-900/50 rounded-lg text-center border border-white/10">
				<p class="text-slate-400 italic">Pierwsze artykuły i poradniki ratownicze pojawią się tutaj już wkrótce...</p>
			</div>
		)}
	</Main>
</Layout>`
  }
];

console.log("🚀 Uruchamiam automatyczną naprawę plików Astro...");

filesToFix.forEach(file => {
  const fullPath = path.resolve(file.filePath);
  if (fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, file.content, 'utf8');
    console.log(`✅ Pomyślnie naprawiono: ${file.filePath}`);
  } else {
    console.log(`⚠️ Pominięto (plik nie istnieje): ${file.filePath}`);
  }
});

console.log("🎉 Wszystkie wskazane pliki zostały zaktualizowane!");