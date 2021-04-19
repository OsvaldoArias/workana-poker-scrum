<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="row justify-content-center">
          <div v-for="vote in cards" :key="vote" class="col-md-3">
            <Card
              @update-issue="updateIssue"
              @vote-status="voteStatus"
              @list-reveal="getListReveal"
              :voted="voted"
              :vote="vote"
              :issue="issueNumber"
            />
          </div>
        </div>
        <hr />
        <Notifications :listReveal="listReveal" :listNoti="listNoti" />
      </div>
      <div class="col-md-4">
        <IssueNumber
          @list-noti="getListNoti"
          :issue="$route.query.issue"
          :status="issue.status"
          :created="issue.createdBy"
          :from="issue.from"
        />
        <b-form-spinbutton
          @change="getIssue"
          v-model="issueNumber"
          min="1"
        ></b-form-spinbutton>
        <br />
        <Users :members="issue.members" :avg="issue.avg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['isHaveNotToken'],
  layout: 'signIn',
  data() {
    return {
      cards: [1, 2, 3, 5, 8, 13, 20, 40, '?'],
      issue: [],
      issueNumber: 1,
      voted: '',
      listReveal: [],
      listNoti: [],
    }
  },
  async fetch() {
    this.issueNumber = parseInt(this.$route.query.issue)
    if (this.issueNumber > 0) {
      try {
        this.issue = await this.$axios.$get(
          `/issues/${this.$route.query.issue}`,
        )
        const { members } = this.issue
        members[this.userId].hasOwnProperty('value')
          ? (this.voted = members[this.userId].value)
          : (this.voted = '')
      } catch (error) {
        console.error('the request could not be made')
      }
    } else {
      await this.$store.dispatch('handleSingOut')
      this.$router.go('/')
    }
  },
  methods: {
    updateIssue({ issue, voted }) {
      this.voted = voted
      this.issue = issue
    },
    voteStatus(status) {
      this.$bvModal.msgBoxOk(status.status)
    },
    getListReveal(value) {
      console.log('listReveal', value)
      this.listReveal = value
    },
    getListNoti(value) {
      this.listNoti = value
    },
    async getIssue() {
      try {
        this.issue = await this.$axios.$get(`/issues/${this.issueNumber}`)
        const { members } = this.issue
        this.voted = members[this.userId].value
      } catch (error) {
        const ANSWER = await this.$bvModal.msgBoxConfirm(
          `Issue ${this.issueNumber} does not exist `,
          {
            title: 'Do you want to create it?',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'warning',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          },
        )
        if (ANSWER) {
          try {
            this.issue = await this.$axios.$post(
              `/issues/${this.issueNumber}/join`,
            )
            const { members } = this.issue
            this.voted = members[this.userId].value
            this.socket = this.$nuxtSocket({ name: 'main' })
            this.socket.emit('issue', {
              userName: this.$store.state.userName,
              newIssue: this.issueNumber,
            })
          } catch (error) {
            console.error('the request could not be made')
          }
        } else {
          --this.issueNumber
        }
      }
      this.$router.push(`/poker-scrum/?issue=${this.issueNumber}`)
    },
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId
    },
  },
}
</script>
