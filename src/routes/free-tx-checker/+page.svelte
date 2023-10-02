<script lang="ts">
  import networkTabImg from '$lib/assets/network-tab.webp'
  import detailsImg from './free-tx-details.webp'

  const sharedDateOpts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }
  const { format } = Intl.DateTimeFormat(undefined, sharedDateOpts)
  const { format: formatUtc } = Intl.DateTimeFormat(undefined, { ...sharedDateOpts, timeZone: 'UTC' })

  let response: string = ''
  let time: string | null = null
  let timeUtc: string | null = null
  let error: string | null = null

  $: {
    error = null

    try {
      const parsedResponse = JSON.parse(response.trim())
      if (!parsedResponse.timeToReset) throw new Error()
      time = format(parsedResponse.timeToReset)
      timeUtc = formatUtc(parsedResponse.timeToReset)
    } catch (_) {
      time = null
      timeUtc = null
      error = `This doesn't look like a valid response. You sure you followed all steps from above?`
    }
  }

  async function paste() {
    try {
      response = await navigator.clipboard.readText()
    } catch (_) {}
  }
</script>

<div class="prose">
  <h1>Free Tx Checker</h1>
  <p class="lead">Find out when your free transactions will be refilled.</p>

  <p><p class="text-sm"><span class="uppercase rounded-full bg-secondary-content text-secondary text-xs px-1">LEGACY</span> TSB has built this feature into their website now. 🎉 Please use the official website to check when your free transactions are refiilled. It's displayed at <a href="https://www.sandbox.game/en/me/settings/blockchain/" rel="noopener">sandbox.game/me/settings/blockchain/</a>.</p>

  <h2>Steps</h2>
  <ol>
    <li>Visit <span class="emph">Settings ></span> <a href="https://www.sandbox.game/en/me/settings/chain/">Blockchain Settings</a> on The Sandbox website. You may want to right-click and <i>Open in a new tab</i>.</li>
    <li>
      Press <kdb class="emph">F12</kdb> to open Chrome Dev Tools and go to the <span class="emph">Network</span> tab.
      <details class="mb-0">
        <summary>Details</summary>
        <figure class="mt-0">
          <img src={networkTabImg} alt="Chrome DevTools Network Tab"/>
          <figcaption>The Network tab sometimes hides behind the double arrow (&raquo;). Just click on it and you'll find the tab.</figcaption>
        </figure>
      </details>
    </li>
    <li>
      Type <kdb class="emph">account</kdb> in the Filter text box and select <span class="emph">Fetch/XHR</span>, then reload the page. Next, right-click the entry named <span class="emph">?account-general</span> and select <span class="emph">Copy > Copy Response</span>.
      <details class="mb-0">
        <summary>Details</summary>
        <figure class="mt-0">
          <img src={detailsImg} alt="Filter requests and copy Response"/>
        </figure>
      </details>
    </li>
    <li>Finally paste the response in the text area below with <kbd class="emph">Ctrl+v</kbd> or the paste button. All the magic happens in your browser, no data is sent anywhere.</li>
  </ol>

  <h2>Let's see</h2>

  <div class="rounded-lg bg-base-200 p-4">
    <div class="form-control not-prose relative">
      <textarea class="textarea textarea-bordered w-full block" rows="3" placeholder="Paste the copied response in here!" bind:value={response}></textarea>
      {#if !!error && !!response}
        <div class="label">
          <p class="label-text-alt text-error">{error}</p>
        </div>
      {/if}
      <button type="button" class="btn btn-square btn-ghost absolute top-1 right-1" on:click={paste}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/></svg>
      </button>
    </div>

    {#if !!time}
      <p>Your free transactions will be reset at:</p>
      <p class="text-center mb-0">
        {#if time !== timeUtc}
          <b>{time}</b><br>
          ({timeUtc})
        {:else}
          <b>{time}</b>
        {/if}
      </p>
    {/if}
  </div>
</div>
