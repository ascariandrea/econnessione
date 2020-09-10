import CMS from "netlify-cms-app"
import { config } from "./config/index"
import { ActorPreview } from "./previews/ActorPreview"
import { ArticlePreview } from "./previews/ArticlePreview"
import { EventPreview } from "./previews/EventPreview"
import { GroupPreview } from "./previews/GroupPreview"
import { PagePreview } from "./previews/PagePreview"
import { TopicPreview } from "./previews/TopicPreview"
import { ColorWidgetControl, ColorWidgetPreview } from "./widgets/Color"
import {UUIDWidgetControl, UUIDWidgetPreview} from './widgets/UUID'
import { withStyletron } from "./withStyletron"
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
const styles = require( "!css-loader!sass-loader!../scss/main.scss")

console.log({styles: styles.toString() })

CMS.registerPreviewStyle(styles.toString(), { raw: true })
CMS.registerPreviewTemplate("actors", withStyletron(ActorPreview))
CMS.registerPreviewTemplate("articles", withStyletron(ArticlePreview))
CMS.registerPreviewTemplate("groups", withStyletron(GroupPreview))
CMS.registerPreviewTemplate("pages", withStyletron(PagePreview))
CMS.registerPreviewTemplate("topics", withStyletron(TopicPreview))
CMS.registerPreviewTemplate("events", withStyletron(EventPreview))

CMS.registerWidget('uuid', UUIDWidgetControl, UUIDWidgetPreview)
CMS.registerWidget('color', ColorWidgetControl, ColorWidgetPreview)

CMS.init({
  config,
})
