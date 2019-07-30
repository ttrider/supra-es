// tslint:disable:object-literal-sort-keys
export default {
    "took": 13,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 33,
        "max_score": 0,
        "hits": []
    },
    "profile": {
        "shards": [{
                "id": "[98ei2xxdRc6Vcqifk--Aqw][plc-amplify-usd-20190405232754][0]",
                "searches": [{
                    "query": [{
                        "type": "MatchAllDocsQuery",
                        "description": "*:*",
                        "time_in_nanos": 14251,
                        "breakdown": {
                            "score": 0,
                            "build_scorer_count": 0,
                            "match_count": 0,
                            "create_weight": 14250,
                            "next_doc": 0,
                            "match": 0,
                            "create_weight_count": 1,
                            "next_doc_count": 0,
                            "score_count": 0,
                            "build_scorer": 0,
                            "advance": 0,
                            "advance_count": 0
                        }
                    }],
                    "rewrite_time": 15529,
                    "collector": [{
                        "name": "CancellableCollector",
                        "reason": "search_cancelled",
                        "time_in_nanos": 51375,
                        "children": [{
                            "name": "EarlyTerminatingCollector",
                            "reason": "search_count",
                            "time_in_nanos": 18089
                        }]
                    }]
                }],
                "aggregations": []
            },
            {
                "id": "[98ei2xxdRc6Vcqifk--Aqw][plc-amplify-usd-20190405232754][1]",
                "searches": [{
                    "query": [{
                        "type": "MatchAllDocsQuery",
                        "description": "*:*",
                        "time_in_nanos": 14872,
                        "breakdown": {
                            "score": 0,
                            "build_scorer_count": 0,
                            "match_count": 0,
                            "create_weight": 14871,
                            "next_doc": 0,
                            "match": 0,
                            "create_weight_count": 1,
                            "next_doc_count": 0,
                            "score_count": 0,
                            "build_scorer": 0,
                            "advance": 0,
                            "advance_count": 0
                        }
                    }],
                    "rewrite_time": 14840,
                    "collector": [{
                        "name": "CancellableCollector",
                        "reason": "search_cancelled",
                        "time_in_nanos": 44328,
                        "children": [{
                            "name": "EarlyTerminatingCollector",
                            "reason": "search_count",
                            "time_in_nanos": 23629
                        }]
                    }]
                }],
                "aggregations": []
            },
            {
                "id": "[98ei2xxdRc6Vcqifk--Aqw][plc-amplify-usd-20190405232754][4]",
                "searches": [{
                    "query": [{
                        "type": "MatchAllDocsQuery",
                        "description": "*:*",
                        "time_in_nanos": 14647,
                        "breakdown": {
                            "score": 0,
                            "build_scorer_count": 0,
                            "match_count": 0,
                            "create_weight": 14646,
                            "next_doc": 0,
                            "match": 0,
                            "create_weight_count": 1,
                            "next_doc_count": 0,
                            "score_count": 0,
                            "build_scorer": 0,
                            "advance": 0,
                            "advance_count": 0
                        }
                    }],
                    "rewrite_time": 26611,
                    "collector": [{
                        "name": "CancellableCollector",
                        "reason": "search_cancelled",
                        "time_in_nanos": 25261,
                        "children": [{
                            "name": "EarlyTerminatingCollector",
                            "reason": "search_count",
                            "time_in_nanos": 17146
                        }]
                    }]
                }],
                "aggregations": []
            },
            {
                "id": "[ez3cTFMMQU2z5oHpXHZ_aw][plc-amplify-usd-20190405232754][2]",
                "searches": [{
                    "query": [{
                        "type": "MatchAllDocsQuery",
                        "description": "*:*",
                        "time_in_nanos": 14857,
                        "breakdown": {
                            "score": 0,
                            "build_scorer_count": 0,
                            "match_count": 0,
                            "create_weight": 14856,
                            "next_doc": 0,
                            "match": 0,
                            "create_weight_count": 1,
                            "next_doc_count": 0,
                            "score_count": 0,
                            "build_scorer": 0,
                            "advance": 0,
                            "advance_count": 0
                        }
                    }],
                    "rewrite_time": 15045,
                    "collector": [{
                        "name": "CancellableCollector",
                        "reason": "search_cancelled",
                        "time_in_nanos": 61079,
                        "children": [{
                            "name": "EarlyTerminatingCollector",
                            "reason": "search_count",
                            "time_in_nanos": 19327
                        }]
                    }]
                }],
                "aggregations": []
            },
            {
                "id": "[ez3cTFMMQU2z5oHpXHZ_aw][plc-amplify-usd-20190405232754][3]",
                "searches": [{
                    "query": [{
                        "type": "MatchAllDocsQuery",
                        "description": "*:*",
                        "time_in_nanos": 14864,
                        "breakdown": {
                            "score": 0,
                            "build_scorer_count": 0,
                            "match_count": 0,
                            "create_weight": 14863,
                            "next_doc": 0,
                            "match": 0,
                            "create_weight_count": 1,
                            "next_doc_count": 0,
                            "score_count": 0,
                            "build_scorer": 0,
                            "advance": 0,
                            "advance_count": 0
                        }
                    }],
                    "rewrite_time": 16600,
                    "collector": [{
                        "name": "CancellableCollector",
                        "reason": "search_cancelled",
                        "time_in_nanos": 55565,
                        "children": [{
                            "name": "EarlyTerminatingCollector",
                            "reason": "search_count",
                            "time_in_nanos": 24631
                        }]
                    }]
                }],
                "aggregations": []
            }
        ]
    }
} as any;