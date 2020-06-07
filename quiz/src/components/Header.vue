<!-- component nav di bv -->
<template>
  <div class="header-container">
    <b-nav tabs>
      <b-nav-item disabled><b>App Quiz 100% Impossibili</b></b-nav-item>
        <b-nav-item disabled>Punteggio: {{ numCorrette }}/{{ numTotali }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
	props: [
		'numCorrette',
		'numTotali'
	]	
}
</script>