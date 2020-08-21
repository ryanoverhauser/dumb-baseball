import baseball from './baseball'

export function cli(argv) {
  let names = []
  let wonkiness = argv.w / 100
  for (let i = 0; i < argv.n; i++) {
    names.push(baseball(wonkiness))
  }
  console.log('\n')
  for (const name of names) {
    console.log(name)
  }
  console.log('\n')
}
