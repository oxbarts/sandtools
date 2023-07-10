<script lang="ts">
  import { base } from '$app/paths'
</script>

<svelte:head>
	<title>More or less useful stuff for The Sandbox players</title>
</svelte:head>

<div class="relative min-h-screen">
  <div class="navbar">
    <div class="navbar-start">
      <a href="{base}/" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
      </a>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <button type="button" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/></svg> -->
        </button>
        <ul class="dropdown-content z-[1] menu p-2 bg-base-200/80 rounded-box w-52">
          <li><a href="{base}/reward-history">Reward history</a></li>
          <li><a href="{base}/free-tx-checker">Free Tx Checker</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="grid w-full place-items-center px-4 py-24">
    <div class="w-[65ch]">
      <slot/>
    </div>
  </div>
</div>

<footer class="footer footer-center bg-base-300 p-4 text-base-content">
  <div>
    <p>
      Not affiliated with The Sandbox. I'm just a happy player!
    </p>
  </div>
</footer>
