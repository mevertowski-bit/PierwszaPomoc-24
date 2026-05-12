<script>
  export let allQuestions = [];
  
  let quizStarted = false;
  let quizFinished = false;
  let currentQuestions = [];
  let currentIndex = 0;
  let userAnswers = [];
  
  let timer = 0;
  let interval;
  let quizContainer; // Referencja do elementu do przewijania

  const REQUIRED_PERCENT = 90;
  const QUESTIONS_COUNT = 30;

  function scrollToTop() {
    if (quizContainer) {
      quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function startQuiz() {
    currentQuestions = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, QUESTIONS_COUNT);
    
    userAnswers = new Array(QUESTIONS_COUNT).fill(null);
    currentIndex = 0;
    quizStarted = true;
    quizFinished = false;
    timer = 0;
    
    clearInterval(interval);
    interval = setInterval(() => {
      timer++;
    }, 1000);

    scrollToTop();
  }

  $: formattedTime = new Date(timer * 1000).toISOString().substr(14, 5);

  function nextQuestion() {
    if (currentIndex < QUESTIONS_COUNT - 1) currentIndex++;
    scrollToTop();
  }

  function prevQuestion() {
    if (currentIndex > 0) currentIndex--;
    scrollToTop();
  }

  function finishQuiz() {
    clearInterval(interval);
    quizFinished = true;
    scrollToTop();
  }

  $: score = userAnswers.reduce((acc, ans, idx) => {
    return ans === currentQuestions[idx].correct ? acc + 1 : acc;
  }, 0);
  
  $: percent = Math.round((score / QUESTIONS_COUNT) * 100);
  $: passed = percent >= REQUIRED_PERCENT;

  function handleSelect(optionIndex) {
    if (!quizFinished) {
      userAnswers[currentIndex] = optionIndex;
    }
  }
</script>

<div bind:this={quizContainer} class="max-w-4xl mx-auto text-slate-900 font-sans p-4 scroll-mt-24">
  
  {#if !quizStarted}
    <div class="bg-white border-2 border-slate-200 p-10 rounded-br-3xl text-center shadow-sm">
      <h2 class="text-4xl font-black uppercase mb-6 tracking-tighter text-slate-900">Egzamin KPP</h2>
      <p class="text-slate-500 mb-8">
        Przed Tobą zestaw {QUESTIONS_COUNT} losowych pytań. <br>
        Wymagany próg zaliczenia to <span class="text-tactical-crimson font-bold">{REQUIRED_PERCENT}%</span>.
      </p>
      <button 
        on:click={startQuiz}
        class="bg-tactical-crimson text-white px-10 py-4 font-bold uppercase hover:bg-slate-900 transition-all shadow-lg"
      >
        Rozpocznij Test
      </button>
    </div>

  {:else if !quizFinished}
    <div class="bg-white border border-slate-200 p-8 rounded-br-3xl shadow-sm relative">
      <div class="flex justify-between items-center mb-8 font-mono text-xs text-slate-400 border-b border-slate-100 pb-4">
        <span>PYTANIE: {currentIndex + 1} / {QUESTIONS_COUNT}</span>
        <span class="text-tactical-crimson font-bold">CZAS: {formattedTime}</span>
      </div>

      <h3 class="text-2xl font-bold mb-8 leading-tight text-slate-900">
        {currentQuestions[currentIndex].question}
      </h3>

      <div class="grid gap-3 mb-10">
        {#each currentQuestions[currentIndex].options as option, i}
          <button 
            on:click={() => handleSelect(i)}
            class="w-full text-left p-4 border-2 transition-all flex justify-between items-center
            {userAnswers[currentIndex] === i ? 'border-tactical-crimson bg-slate-50' : 'border-slate-100 hover:border-slate-300 bg-white'}"
          >
            <span class={userAnswers[currentIndex] === i ? 'text-tactical-crimson font-semibold' : 'text-slate-700'}>{option}</span>
            <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center {userAnswers[currentIndex] === i ? 'border-tactical-crimson' : 'border-slate-200'}">
                {#if userAnswers[currentIndex] === i}<div class="w-2.5 h-2.5 bg-tactical-crimson rounded-full"></div>{/if}
            </div>
          </button>
        {/each}
      </div>

      <div class="flex justify-between items-center border-t border-slate-100 pt-8">
        <button 
          on:click={prevQuestion} 
          disabled={currentIndex === 0}
          class="px-6 py-2 border border-slate-200 text-slate-400 text-sm uppercase disabled:opacity-30 hover:bg-slate-50 transition-colors"
        >
          Wstecz
        </button>
        
        <button on:click={finishQuiz} class="text-xs text-slate-400 hover:text-tactical-crimson transition-colors uppercase underline decoration-dotted">
            Przerwij test
        </button>

        {#if currentIndex === QUESTIONS_COUNT - 1}
          <button on:click={finishQuiz} class="px-8 py-3 bg-tactical-crimson text-white font-bold uppercase shadow-md">Zakończ</button>
        {:else}
          <button on:click={nextQuestion} class="px-8 py-3 bg-slate-900 text-white font-bold uppercase shadow-md">Dalej</button>
        {/if}
      </div>
    </div>

  {:else}
    <div class="space-y-8 animate-in fade-in duration-500">
      <div class="bg-white border-2 {passed ? 'border-green-500' : 'border-tactical-crimson'} p-10 rounded-br-3xl text-center shadow-lg">
        <div class="inline-block px-4 py-1 mb-4 rounded-full font-mono text-xs {passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
          RAPORT KOŃCOWY
        </div>
        <h2 class="text-6xl font-black mb-2 text-slate-900">{percent}%</h2>
        <p class="text-slate-500 mb-6 font-mono text-sm uppercase tracking-widest">WYNIK: {score} / {QUESTIONS_COUNT} PKT</p>
        
        {#if passed}
          <p class="text-green-600 font-bold text-xl uppercase mb-8">Pozytywny. Jesteś gotowy do działania!</p>
        {:else}
          <p class="text-tactical-crimson font-bold text-xl uppercase mb-8">Niedostateczny. Wymagane powtórzenie materiału.</p>
        {/if}

        <button on:click={startQuiz} class="bg-slate-900 text-white px-10 py-4 font-bold uppercase hover:bg-tactical-crimson transition-all shadow-xl">
            Podejdź ponownie
        </button>
      </div>

      <div class="space-y-6">
        <h3 class="text-lg font-bold uppercase tracking-widest text-slate-400 text-center py-4 border-b border-slate-100">Analiza odpowiedzi</h3>
        
        {#each currentQuestions as q, idx}
            <div class="p-6 bg-white border border-slate-100 rounded-lg shadow-sm">
            <div class="flex flex-col sm:flex-row gap-4">
                <span class="font-mono text-slate-300">#{idx + 1}</span>
                
                <div class="w-full">
                <p class="font-bold text-slate-900 mb-4">{q.question}</p>
                
                <div class="grid grid-cols-1 gap-2 w-full">
                    {#each q.options as opt, i}
                    <div class="w-full p-3 text-sm border-2 rounded
                        {i === q.correct ? 'border-green-500 bg-green-50 text-green-700 font-medium' : 
                        (userAnswers[idx] === i && i !== q.correct ? 'border-red-400 bg-red-50 text-red-700' : 'border-slate-50 text-slate-400')}">
                        
                        <div class="flex justify-between items-center">
                        <span>{opt}</span>
                        <div class="flex items-center shrink-0">
                            {#if i === q.correct} <span class="ml-2">✓</span>{/if}
                            {#if userAnswers[idx] === i && i !== q.correct} <span class="ml-2 font-bold">✗ (Twój wybór)</span>{/if}
                        </div>
                        </div>
                        
                    </div>
                    {/each}
                </div>
                </div>
            </div>
            </div>
        {/each}

        <div class="py-12 flex justify-center">
            <button 
            on:click={startQuiz} 
            class="bg-tactical-crimson text-white px-12 py-5 font-black uppercase hover:bg-slate-900 transition-all shadow-2xl flex flex-col items-center gap-1"
            >
            <span>Podejdź ponownie</span>
            <span class="text-[10px] font-normal opacity-70 italic tracking-normal capitalize">Wylosuj nową pulę pytań</span>
            </button>
        </div>
        </div>
    </div>
  {/if}
</div>