<script lang="ts">
  import Tool from '$lib/components/tool.svelte'
  import { base } from '$app/paths'

  let address = 'MHhjN2FjNWQxOWJlYmNiZjJkYTZhYzY5OTZkOWExZjkwZGI1ODA5ZmEz'
  let showingAddress = false
  function showAddress() {
    address = atob(address)
    showingAddress = true
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address)
    } catch(_) {
      alert(`Oops, that didn't work. You have to copy the address manually.`)
    }

  }

</script>

<div class="prose">
  <h1>Hey there!</h1>
  <p class="lead">Looking to delve deeper into your <a href="https://www.sandbox.game/en/">Sandbox</a> account? Here are some tools that help you get some insights the easy way. Your data never leaves your computer. Nor do the tools hack and jeopardize your account in any way. So explore fearlessly!</p>
  <p>*One more thing: I am not affiliated with The Sandbox and I have nothing to do with them except me being a happy player. All this is basically fan art in code 😎</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 not-prose">
    <Tool title="Reward history" icon="money" description="List (almost) all rewards you received" url="{base}/reward-history"/>
    <Tool title="Free Tx Checker" icon="tx" description="Check when your free transactions will be refilled." url="{base}/free-tx-checker"/>
  </div>

  <p>New tools soon.</p>

  <h2>More info? Sure!</h2>

  <h3>How do these tools work?</h3>
  <p>All (current) tools rely on Chrome DevTools, although they might work in other browsers as well (I didn't test and I won't test 😈). They simply present information that is already sent to your browser in a more readable format.</p>

  <h3>Is this save? How can I know?</h3>
  <p>You can read the source code of this site at <a href="https://github.com/oxbarts/sandtools">github.com/oxbarts/sandtools</a>. If JavaScript isn't your language, though, you can't TBH. You'll have to trust me. 🫣</p>

  <h3>Wouldn't all this be easier if this was a Chrome extension?</h3>
  <p>Yeah, probably. But let's be honest, as useful as these tools are, you won't use them that often. It would be kind of impractical to carry the extension around for just one or two uses per month.</p>

  <h3>Will The Sandbox flag/ban/torture/tar and feather me if I use these tools?</h3>
  <p>Well, I don't know, how should I know this? But let's be real, as I said, these tools only analyze data that is already sent to your browser, so probably not.</p>

  <h3>Is my wallet at risk if I use these tools?</h3>
  <p>No. The information analyzed doesn't contain any of your wallet keys. But be careful nonetheless: do not, under any circumstances, enter your wallet password or seed phrase anywhere on this website. Also, there's no need to connect your wallet or sign something here. And, I will never contact you asking for such data. Not here, not on any other platform. If someone who looks like me requests this information, it's not me.</p>

  <h3>Can you make this or that tool?</h3>
  <p>No. 😉</p>

  <h3>I'm a whale and I like your tools, and I want to make you a whale too.</h3>
  <p>Wow, that's very kind of you. Send riches to this address</p>
  {#if showingAddress}
    <div class="join">
      <input type="text" class="input input-bordered join-item flex-grow w-full" value={address} readonly>
      <button type="button" class="btn join-item" on:click={copyAddress}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"/></svg>
        Copy
      </button>
    </div>
  {:else}
    <p><button type="button" class="btn" on:click={showAddress}>Show Address</button></p>
  {/if}
  <p><i>*You don't have to be a whale to show appreciation and support these free tools. A few SAND go a long way.</i> 😁</p>

  <h3>I've found an error, how can I report it?</h3>
  <p>Hit me up on the Sandbox Discord, I'm <i>Oxbarts</i> (ID: oxbarts). Or create an <a href="https://www.github.com/oxbarts/sandtools">issue on Github</a>.</p>

  <h3>How did you make this website?</h3>
  <p>It's was built with <a href="https://kit.svelte.dev/">SvelteKit</a>, and that's exactly why it exists. I wanted to try out SvelteKit and thought it would be awesome to combine useful tools for a game I play in my free time with the cool tech I wanted to experiment with anyway.</p>
</div>
