export default function ({ store, redirect }) {
  if (store.state.token != '') {
    return redirect('/poker-scrum/?issue=1')
  }
}
