<script lang="ts">
  import networkTabImg from '$lib/assets/network-tab.webp'
  import detailsImg from './reward-history-details.webp'

  const { format } = Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

  type Item = {
    amount: number
    name: string
    id?: string
    url?: string
    marketUrl?: string
  }

  type Reward = {
    id: number
    name: string
    description: string
    givenAt: string
    items: Item[]
  }

  let response: string = ''
  let error: string | null = null
  let rewards: Reward[] = []

  $: {
    error = null

    try {
      const parsedResponse = JSON.parse(response.trim())
      rewards = parsedResponse.map(({ id, name, description, startDate, MultiGiveawayItems }) => ({
        id,
        name,
        description,
        givenAt: format(new Date(startDate)),
        items: MultiGiveawayItems.map(({ Asset, amount, contractAddress }, i) => ({
          name: Asset ? Asset.name : 'SAND',
          amount: Asset ? amount : Number(BigInt(amount)/BigInt("10000000000000000"))/100,
          id: Asset ? Asset.id : `SAND-${i}`,
          url: Asset ? `https://opensea.io/assets/ethereum/${contractAddress}/${Asset.blockchainId}` : undefined,
          marketUrl: Asset ? `https://www.sandbox.game/en/assets/${Asset.name.toLowerCase().replace(/[\s_-]+/g, '-')}/${Asset.id}/` : undefined
        }))
      }))
    } catch (_) {
      rewards = []
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
  <h1>Reward history</h1>
  <p class="lead">Can't remember all those sweet and juice rewards that you already claimed? Fear not, I've got your back!</p>
  <p>*There's a little limitation: rewards that were dropped directly into you wallet by The Sandbox can't be listed here. But these are only premium NFTs and you wouldn't forget these anyway, would you?!</p>

  <h2>Steps</h2>
  <ol>
    <li>Visit the <a href="https://www.sandbox.game/en/me/claim/">Claims</a> section on The Sandbox website. You may want to right-click and <i>Open in a new tab</i>.</li>
    <li>
      Press <kdb class="emph">F12</kdb> to open Chrome DevTools and go to the <span class="emph">Network</span> tab.
      <details class="mb-0">
        <summary>Details</summary>
        <figure class="mt-0">
          <img src={networkTabImg} alt="Chrome DevTools Network Tab"/>
          <figcaption>The Network tab sometimes hides behind the double arrow (&raquo;). Just click on it and you'll find the tab.</figcaption>
        </figure>
      </details>
    </li>
    <li>
      Type <kdb class="emph">search</kdb> in the Filter text box and select <span class="emph">Fetch/XHR</span>, then reload the page. Next, right-click the entry named <span class="emph">search?userId=...</span> and select <span class="emph">Copy > Copy Response</span>.
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

    {#if response && !error}
      <p>Here's your reward history:</p>
      <table class="table overflow-x-auto mb-0">
        <thead>
          <tr class="border-b border-base-content/20">
            <th>#</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody class="">
          {#each rewards as reward, i (reward.id)}
            <tr>
              <td class="align-top">{i + 1}</td>
              <td class="prose prose-sm">
                <p><b>{reward.name}</b><br><span class="opacity-75">({reward.givenAt})</span></p>
                <ul>
                  {#each reward.items as item (item.id)}
                    <li>
                      {item.amount}
                      {#if item.id.startsWith('SAND-')}
                        {item.name}
                      {:else}
                        <a href={item.url}>{item.name}</a> (<a href={item.marketUrl}>Marketplace</a>)
                      {/if}
                    </li>
                  {/each}
                </ul>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>
