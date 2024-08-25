import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UserVoteComponentProps } from '@/types'

const CardVoteSummary = ({votes}: {votes: UserVoteComponentProps[]}) => {
  const groupedVotes = votes.reduce((acc, vote) => {
    const key = vote.vote.toString()
    if(!acc[key]) {
      acc[key] = []
    }
    acc[key].push(vote.name)
    return acc
  }, {} as Record<string, string[]>)

  const sortedVoteGroups = Object.entries(groupedVotes).sort((a, b) => {
    const voteA = isNaN(Number(a[0])) ? Infinity : Number(a[0])
    const voteB = isNaN(Number(b[0])) ? Infinity : Number(b[0])
    return voteA - voteB
  })

  const totalVotes = votes.length

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Scrum Poker Vote Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sortedVoteGroups.map(([vote, voters]) => (
            <Card key={vote}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold">{vote}</h3>
                  <Badge variant="secondary">
                    {voters.length} {voters.length === 1 ? 'vote' : 'votes'}
                  </Badge>
                </div>
                <Progress value={(voters.length / totalVotes) * 100} className="mb-2" />
                <div className="flex flex-wrap gap-2">
                  {voters.map((voter, index) => (
                    <Badge key={index} variant="outline">
                      {voter}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardVoteSummary