
import React from 'react'
import { onGetAllAccountDomains } from '../../../actions/settings'
import ConversationMenu from '../../../components/conversations'
import { Separator } from '../../../components/ui/separator'
import InfoBar from '../../../components/infobar'
import Messenger from '../../../components/conversations/messenger'

type Props = {}

const ConversationPage = async (props: Props) => {
  const domains = await onGetAllAccountDomains()
  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains?.domains} />

      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messenger />
      </div>
    </div>
  )
}

export default ConversationPage
