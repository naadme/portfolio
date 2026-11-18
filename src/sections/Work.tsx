import { projects } from '../data/projects'
import ProjectStage from '../components/ProjectStage'
import Words from '../components/Words'
export default function Work() {
  return (
    <div className="band work" id="work">
      <div className="wrap work-head" data-sp="pass"><h2><Words text="Five projects. Real clients, real products and work in progress." /></h2></div>
      {projects.map((p, i) => <ProjectStage key={p.id} p={p} index={i} />)}
    </div>
  )
}
