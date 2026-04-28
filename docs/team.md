---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const founder = [
  {
    avatar: 'https://www.github.com/Luxauram.png',
    name: "Luca D'Aurizio (LuxAuram)",
    title: 'Founder / Maintainer',
    org: 'OhMyOpenSource!',
    orgLink: 'https://ohmyopensource.org',
    desc: 'Dat Rosa Mel Apibus.',
    links: [
      { icon: 'github', link: 'https://github.com/Luxauram' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/luca-daurizio/' }
    ]
  },
]

const coreMembers = [
  {
    avatar: 'https://www.github.com/alessiodlm.png',
    name: 'Alessio Del Muto',
    title: 'Developer / Contributor',
    desc: 'Start Fresh Next Semester',
    links: [
      { icon: 'github', link: 'https://github.com/alessiodlm' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alessio-del-muto-7abb13401/' }
    ]
  },
  {
    avatar: 'https://www.github.com/antoniods10.png',
    name: 'Antonio De Santis',
    title: 'Developer / Contributor',
    desc: 'Non è un Bug, è una Feature',
    links: [
      { icon: 'github', link: 'https://github.com/antoniods10' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/antonio-de-santis-034908401/' }
    ]
  },
  {
    avatar: 'https://www.github.com/f-ferretti.png',
    name: 'Francesco Ferretti',
    title: 'Developer / Contributor',
    desc: '',
    links: [
      { icon: 'github', link: 'https://github.com/f-ferretti' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/francesco-ferretti-4846a5393/' }
    ]
  },
  {
    avatar: 'https://www.github.com/Lucalanese.png',
    name: 'Luca Lanese',
    title: 'Developer / Contributor',
    desc: 'Se funziona non toccarlo',
    links: [
      { icon: 'github', link: 'https://github.com/Lucalanese' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/luca-lanese04/' }
    ]
  },
  {
    avatar: 'https://www.github.com/VittorioDiPalma.png',
    name: 'Vittorio Di Palma',
    title: 'Developer / Contributor',
    desc: '',
    links: [
      { icon: 'github', link: 'https://github.com/VittorioDiPalma' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/vittorio-di-palma-18a049392/' }
    ]
  }
]

const partners = [
  {
    avatar: 'https://www3.unimol.it/assets/images/unimol/images/header/unimol_on.svg',
    name: 'UNIMOL',
    title: 'University',
    org: 'University of Molise, Italy',
    orgLink: 'https://www3.unimol.it/'
  },
]

const support = [
  {
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_gdQoe-SxKGw3IvS-1G_JPsMY70HkqxAPg&s',
    name: 'GitHub Sponsors',
    title: 'Support this project on GitHub',
    org: 'GitHub',
    sponsor: 'https://github.com/sponsors/Luxauram',
    actionText: 'Support Us'
  },
  {
    avatar: 'https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_640.png',
    name: 'PayPal',
    title: 'Make a donation via PayPal',
    org: 'PayPal  ',
    sponsor: 'https://paypal.me/luxauram',
    actionText: 'Donate'
  },
  {
    avatar: 'https://ps.w.org/ko-fi-button/assets/icon-256x256.png?rev=3252422',
    name: 'Ko-fi',
    title: 'Buy a coffee',
    org: 'Ko-fi',
    sponsor: 'https://ko-fi.com/luxauram',
    actionText: 'Coffee Button'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
    Our Brave Nerd Team
    </template>
    <template #lead>
    All the people behind this documentation and the main OhMyUniversity! Project
    </template>
  </VPTeamPageTitle>

  <VPTeamMembers size="medium" :members="founder" />
  <VPTeamMembers size="medium" :members="coreMembers" />

  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>Corporate Sponsors</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>Supporters</template>
    <template #lead>Community Donations</template>
    <template #members>
      <VPTeamMembers size="small" :members="support" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
