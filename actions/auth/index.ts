'use server'
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { onGetAllAccountDomains } from '../settings'
import { client } from '../../lib/prisma'

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    console.error('Error in onCompleteUserRegistration:', error)
    if (error instanceof Error) {
      return { status: 400, message: error.message }
    }
    return { status: 400, message: 'An unknown error occurred' }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()
  if (!user) {
    console.warn('No current user, redirecting to sign in')
    redirectToSignIn();
  } else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      })
      if (authenticated) {
        const domains = await onGetAllAccountDomains()
        return { status: 200, user: authenticated, domain: domains?.domains }
      }
    } catch (error) {
      console.error('Error in onCompleteUserRegistration:', error)
    if (error instanceof Error) {
      return { status: 400, message: error.message }
    }
    return { status: 400, message: 'An unknown error occurred' }
    }
  }
}