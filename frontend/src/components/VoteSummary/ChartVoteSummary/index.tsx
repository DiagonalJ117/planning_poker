import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserVoteComponentProps } from '@/types'

const ChartVoteSummary = ({votes}: {votes: UserVoteComponentProps[]}) => {
  const groupedVotes = votes.reduce((acc, vote) => {
    const key = vote.vote.toString()
    if (!acc[key]) {
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

  const maxVotes = Math.max(...sortedVoteGroups.map(([_, voters]) => voters.length))
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Scrum Poker Vote Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedVoteGroups.map(([vote, voters]) => (
            <div key={vote} className="flex items-center gap-4">
              <div className="w-12 text-right font-bold">{vote}</div>
              <div className="flex-1">
                <div 
                  className="bg-primary h-8 rounded"
                  style={{ width: `${(voters.length / maxVotes) * 100}%` }}
                />
              </div>
              <div className="w-16 text-right">
                <Badge variant="secondary">
                  {voters.length}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Voters</h3>
          <div className="flex flex-wrap gap-2">
            {votes.map((vote, index) => (
              <Badge key={index} variant="outline">
                {vote.name}: {vote.vote}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartVoteSummary