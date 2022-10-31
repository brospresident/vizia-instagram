// import * as fs from 'fs';
import * as fs from 'fs';
const axios = require('axios');

const originalManifest = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "describedBy": "http://vizia.brandwatch.com/manifest/v3",
    "displayName": "si",
    "description": "[DESCRIPTION]",
    "browserScripts": [
        "../vizia-numeral/vizia-numeral.min.js",
        "../vizia-moment/vizia-moment.min.js"
    ],
    "options": {
        "required": [
            "profile",
            "yValue"
        ],
        "properties": {
            "profile": {
                "title": "Profile to track",
                "help": "Profile id to track",
                "default": "",
                "type": "string"
            },
            "platform": {
                "title": "Profile platform",
                "enum": [
                    "facebook",
                    "instagram",
                    "linkedin",
                    "youtube",
                    "tiktok",
                    "twitter"
                ],
                "labels": [
                    "Facebook",
                    "Instagram",
                    "LinkedIn",
                    "YouTube",
                    "TikTok",
                    "Twitter"
                ],
                "type": "string"
            },
            "project": {
                "title": "Project with the profile",
                "type": "string"
            },
            "yValue": {
                "title": "Metric",
                "enum": [
                    "followers_today"
                ],
                "labels": [
                    "Followers Today"
                ],
                "type": "string"
            },
            "key": {
                "type": "string",
                "title": "Vizia Key",
                "default": "ANDREI_KEY"
            },
            "format": {
                "title": "Number Format",
                "enum": [
                    "text",
                    "number",
                    "percent"
                ],
                "labels": [
                    "Plain Text",
                    "Number",
                    "Percentage"
                ],
                "type": "string"
            }
        }
    },
    "legacyId": "si-key-metric",
    "groupId": "custom",
    "artifactRoot": "bundle-si-key-metric",
    "artifacts": {
        "full": "bundle-si-key-metric/build/bundle.min.js"
    },
    "visualization": "key-stat",
    "platform": [
        "@vizia/destination-key-metric"
    ],
    "thumbnail_url": "total_mentions.svg"
}

const platforms = ['Facebook', 'Instagram', 'Twitter', 'Linkedin', 'YouTube', 'TikTok'];

const platformMetrics = {
    'facebook': [ 
        {
            "enum": "name",
            "name": "name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "fans_today",
            "name": "fans_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_today_history",
            "name": "fans_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans",
            "name": "fans",
            "type": "NUMBER",
            "metric": true
        },
        {   
            "enum": "followers",
            "name": "followers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_history",
            "name": "fans_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_growth",
            "name": "fans_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_growth_history",
            "name": "fans_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_growth_percent",
            "name": "fans_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_growth_percent_history",
            "name": "fans_growth_percent_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_adds",
            "name": "fans_adds",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_adds_history",
            "name": "fans_adds_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_removes",
            "name": "fans_removes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "fans_removes_history",
            "name": "fans_removes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_views",
            "name": "video_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_views_history",
            "name": "video_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_view_time",
            "name": "video_view_time",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_view_time_history",
            "name": "video_view_time_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_messages_total_messaging_connections",
            "name": "page_messages_total_messaging_connections",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_messages_total_messaging_connections_history",
            "name": "page_messages_total_messaging_connections_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_messages_new_conversations_unique",
            "name": "page_messages_new_conversations_unique",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_messages_new_conversations_unique_history",
            "name": "page_messages_new_conversations_unique_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_total_actions",
            "name": "page_total_actions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_total_actions_history",
            "name": "page_total_actions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_website_clicks",
            "name": "page_website_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_website_clicks_history",
            "name": "page_website_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_get_directions_clicks",
            "name": "page_get_directions_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_get_directions_clicks_history",
            "name": "page_get_directions_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_call_phone_clicks",
            "name": "page_call_phone_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_call_phone_clicks_history",
            "name": "page_call_phone_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_cta_clicks",
            "name": "page_cta_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_cta_clicks_history",
            "name": "page_cta_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reactions",
            "name": "reactions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reactions_history",
            "name": "reactions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments",
            "name": "comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments_history",
            "name": "comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares",
            "name": "shares",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares_history",
            "name": "shares_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_reactions",
            "name": "average_reactions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_reactions_history",
            "name": "average_reactions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments",
            "name": "average_comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_history",
            "name": "average_comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_shares",
            "name": "average_shares",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_shares_history",
            "name": "average_shares_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts",
            "name": "posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_history",
            "name": "posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "like_count",
            "name": "like_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "like_count_history",
            "name": "like_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "love_count",
            "name": "love_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "love_count_history",
            "name": "love_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "wow_count",
            "name": "wow_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "wow_count_history",
            "name": "wow_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "haha_count",
            "name": "haha_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "haha_count_history",
            "name": "haha_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "sad_count",
            "name": "sad_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "sad_count_history",
            "name": "sad_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "angry_count",
            "name": "angry_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "angry_count_history",
            "name": "angry_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "thankful_count",
            "name": "thankful_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "thankful_count_history",
            "name": "thankful_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "pride_count",
            "name": "pride_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "pride_count_history",
            "name": "pride_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "care_count",
            "name": "care_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "care_count_history",
            "name": "care_count_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post",
            "name": "engagement_rate_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post_history",
            "name": "engagement_rate_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile",
            "name": "engagement_rate_per_profile",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile_history",
            "name": "engagement_rate_per_profile_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day",
            "name": "average_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day_history",
            "name": "average_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post",
            "name": "average_engagement_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post_history",
            "name": "average_engagement_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day",
            "name": "average_posts_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day_history",
            "name": "average_posts_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach",
            "name": "reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach_history",
            "name": "reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_reach",
            "name": "avg_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_reach_history",
            "name": "avg_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_paid_reach",
            "name": "avg_paid_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_paid_reach_history",
            "name": "avg_paid_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_organic_reach",
            "name": "avg_organic_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_organic_reach_history",
            "name": "avg_organic_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "impressions",
            "name": "impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "impressions_history",
            "name": "impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_impressions",
            "name": "avg_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_impressions_history",
            "name": "avg_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_paid_impressions",
            "name": "avg_paid_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_paid_impressions_history",
            "name": "avg_paid_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_organic_impressions",
            "name": "avg_organic_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_organic_impressions_history",
            "name": "avg_organic_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_posts",
            "name": "video_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_posts_history",
            "name": "video_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_engagement",
            "name": "video_engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_engagement_history",
            "name": "video_engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_live_posts",
            "name": "video_live_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_live_posts_history",
            "name": "video_live_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_live_engagement",
            "name": "video_live_engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_live_engagement_history",
            "name": "video_live_engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "boosted_posts",
            "name": "boosted_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "boosted_posts_history",
            "name": "boosted_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "boosted_engagement",
            "name": "boosted_engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "boosted_engagement_history",
            "name": "boosted_engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_boosted_posts",
            "name": "not_boosted_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_boosted_posts_history",
            "name": "not_boosted_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_boosted_engagement",
            "name": "not_boosted_engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_boosted_engagement_history",
            "name": "not_boosted_engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_yet_boosted_posts",
            "name": "not_yet_boosted_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_yet_boosted_posts_history",
            "name": "not_yet_boosted_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_yet_boosted_engagement",
            "name": "not_yet_boosted_engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "not_yet_boosted_engagement_history",
            "name": "not_yet_boosted_engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_reach",
            "name": "page_posts_sum_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_reach_history",
            "name": "page_posts_sum_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_organic_reach",
            "name": "page_posts_sum_organic_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_organic_reach_history",
            "name": "page_posts_sum_organic_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_paid_reach",
            "name": "page_posts_sum_paid_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_paid_reach_history",
            "name": "page_posts_sum_paid_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_impressions",
            "name": "page_posts_sum_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_impressions_history",
            "name": "page_posts_sum_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_organic_impressions",
            "name": "page_posts_sum_organic_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_organic_impressions_history",
            "name": "page_posts_sum_organic_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_paid_impressions",
            "name": "page_posts_sum_paid_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_posts_sum_paid_impressions_history",
            "name": "page_posts_sum_paid_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_reach",
            "name": "page_sum_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_reach_history",
            "name": "page_sum_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach_penetration",
            "name": "reach_penetration",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach_penetration_history",
            "name": "reach_penetration_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_organic_reach",
            "name": "page_sum_organic_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_organic_reach_history",
            "name": "page_sum_organic_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_paid_reach",
            "name": "page_sum_paid_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_paid_reach_history",
            "name": "page_sum_paid_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_impressions",
            "name": "page_sum_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_impressions_history",
            "name": "page_sum_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_organic_impressions",
            "name": "page_sum_organic_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_organic_impressions_history",
            "name": "page_sum_organic_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_paid_impressions",
            "name": "page_sum_paid_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "page_sum_paid_impressions_history",
            "name": "page_sum_paid_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_eng_rate_per_followers_per_post",
            "name": "avg_eng_rate_per_followers_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_eng_rate_per_followers_per_post_history",
            "name": "avg_eng_rate_per_followers_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_eng_rate_per_followers_per_profile",
            "name": "total_eng_rate_per_followers_per_profile",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_eng_rate_per_followers_per_profile_history",
            "name": "total_eng_rate_per_followers_per_profile_history",
            "type": "NUMBER",
            "metric": true
        }
    ],
    'instagram': [
        {
            "enum": "name",
            "name": "name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "followers_today",
            "name": "followers_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_today_history",
            "name": "followers_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers",
            "name": "followers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_history",
            "name": "followers_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth",
            "name": "followers_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_history",
            "name": "followers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent",
            "name": "followers_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent_history",
            "name": "followers_growth_percent_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post",
            "name": "engagement_rate_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post_history",
            "name": "engagement_rate_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile",
            "name": "engagement_rate_per_profile",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile_history",
            "name": "engagement_rate_per_profile_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes",
            "name": "likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes_history",
            "name": "likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments",
            "name": "comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments_history",
            "name": "comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts",
            "name": "posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_history",
            "name": "posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day",
            "name": "average_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day_history",
            "name": "average_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post",
            "name": "average_engagement_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post_history",
            "name": "average_engagement_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes_per_post",
            "name": "average_likes_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes_per_post_history",
            "name": "average_likes_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_per_post",
            "name": "average_comments_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_per_post_history",
            "name": "average_comments_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day",
            "name": "average_posts_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day_history",
            "name": "average_posts_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_post",
            "name": "average_hashtags_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_post_history",
            "name": "average_hashtags_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_reach",
            "name": "total_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_reach_history",
            "name": "total_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_reach_penetration",
            "name": "posts_reach_penetration",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_reach_penetration_history",
            "name": "posts_reach_penetration_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_impressions",
            "name": "total_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_impressions_history",
            "name": "total_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_reach_per_post",
            "name": "average_reach_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_reach_per_post_history",
            "name": "average_reach_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_impressions_per_post",
            "name": "average_impressions_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_impressions_per_post_history",
            "name": "average_impressions_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_views",
            "name": "video_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "video_views_history",
            "name": "video_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories",
            "name": "stories",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_history",
            "name": "stories_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_days_with_stories",
            "name": "stories_days_with_stories",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_days_with_stories_history",
            "name": "stories_days_with_stories_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_per_day",
            "name": "stories_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_per_day_history",
            "name": "stories_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_avg_peak_reach",
            "name": "stories_avg_peak_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_avg_peak_reach_history",
            "name": "stories_avg_peak_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_max_peak_reach",
            "name": "stories_max_peak_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_max_peak_reach_history",
            "name": "stories_max_peak_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_peak_reach_rate",
            "name": "stories_peak_reach_rate",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_peak_reach_rate_history",
            "name": "stories_peak_reach_rate_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_avg_retention_rate",
            "name": "stories_avg_retention_rate",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_avg_retention_rate_history",
            "name": "stories_avg_retention_rate_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_impressions",
            "name": "stories_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_impressions_history",
            "name": "stories_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_replies",
            "name": "stories_replies",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_replies_history",
            "name": "stories_replies_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_reach",
            "name": "stories_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_reach_history",
            "name": "stories_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_reach_penetration",
            "name": "stories_reach_penetration",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "stories_reach_penetration_history",
            "name": "stories_reach_penetration_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_story",
            "name": "average_hashtags_per_story",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_story_history",
            "name": "average_hashtags_per_story_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_reach",
            "name": "profile_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_reach_history",
            "name": "profile_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_reach_penetration",
            "name": "profile_reach_penetration",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_reach_penetration_history",
            "name": "profile_reach_penetration_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_impressions",
            "name": "profile_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_impressions_history",
            "name": "profile_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_views",
            "name": "profile_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_views_history",
            "name": "profile_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_email_contacts",
            "name": "profile_email_contacts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_email_contacts_history",
            "name": "profile_email_contacts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_text_message_clicks",
            "name": "profile_text_message_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_text_message_clicks_history",
            "name": "profile_text_message_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_get_directions_clicks",
            "name": "profile_get_directions_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_get_directions_clicks_history",
            "name": "profile_get_directions_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_phone_call_clicks",
            "name": "profile_phone_call_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_phone_call_clicks_history",
            "name": "profile_phone_call_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_website_clicks",
            "name": "profile_website_clicks",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "profile_website_clicks_history",
            "name": "profile_website_clicks_history",
            "type": "NUMBER",
            "metric": true
        },
    ],
    'twitter': [
        {
            "enum": "name",
            "name": "name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "tweets",
            "name": "tweets",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "tweets_history",
            "name": "tweets_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "replies",
            "name": "replies",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "replies_history",
            "name": "replies_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "retweets",
            "name": "retweets",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "retweets_history",
            "name": "retweets_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes",
            "name": "likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes_history",
            "name": "likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_retweets",
            "name": "avg_retweets",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_retweets_history",
            "name": "avg_retweets_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_likes",
            "name": "avg_likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_likes_history",
            "name": "avg_likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_tweets_per_day",
            "name": "avg_tweets_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_tweets_per_day_history",
            "name": "avg_tweets_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_tweet",
            "name": "average_engagement_per_tweet",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_tweet_history",
            "name": "average_engagement_per_tweet_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_engagement_per_day",
            "name": "avg_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_engagement_per_day_history",
            "name": "avg_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_today",
            "name": "followers_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_today_history",
            "name": "followers_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers",
            "name": "followers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_history",
            "name": "followers_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "follower_growth",
            "name": "follower_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "follower_growth_history",
            "name": "follower_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "follower_growth_percent",
            "name": "follower_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "follower_growth_percent_history",
            "name": "follower_growth_percent_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_tweet",
            "name": "engagement_rate_per_tweet",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_tweet_history",
            "name": "engagement_rate_per_tweet_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile",
            "name": "engagement_rate_per_profile",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile_history",
            "name": "engagement_rate_per_profile_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "mentions",
            "name": "mentions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "mentions_history",
            "name": "mentions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "mentioners",
            "name": "mentioners",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "mentioners_history",
            "name": "mentioners_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_impressions",
            "name": "total_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_impressions_history",
            "name": "total_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_organic_impressions",
            "name": "total_organic_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_organic_impressions_history",
            "name": "total_organic_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_paid_impressions",
            "name": "total_paid_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_paid_impressions_history",
            "name": "total_paid_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_view_count",
            "name": "total_view_count",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_view_count_history",
            "name": "total_view_count_history",
            "type": "NUMBER",
            "metric": true
        }
    ],
    'tiktok': [
        {
            "enum": "name",
            "name": "name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "followers_today",
            "name": "followers_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_today_history",
            "name": "followers_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers",
            "name": "followers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_history",
            "name": "followers_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth",
            "name": "followers_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_history",
            "name": "followers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent",
            "name": "followers_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent_history",
            "name": "followers_growth_percent_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts",
            "name": "posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_history",
            "name": "posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes",
            "name": "likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes_history",
            "name": "likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments",
            "name": "comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments_history",
            "name": "comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares",
            "name": "shares",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares_history",
            "name": "shares_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "plays",
            "name": "plays",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "plays_history",
            "name": "plays_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes",
            "name": "average_likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes_history",
            "name": "average_likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments",
            "name": "average_comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_history",
            "name": "average_comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day",
            "name": "average_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day_history",
            "name": "average_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post",
            "name": "average_engagement_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post_history",
            "name": "average_engagement_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day",
            "name": "average_posts_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day_history",
            "name": "average_posts_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_post",
            "name": "average_hashtags_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_hashtags_per_post_history",
            "name": "average_hashtags_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_plays_rate",
            "name": "engagement_plays_rate",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_plays_rate_history",
            "name": "engagement_plays_rate_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "day_with_most_posts",
            "name": "day_with_most_posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "day_with_most_posts_history",
            "name": "day_with_most_posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "day_with_most_engagement_average",
            "name": "day_with_most_engagement_average",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "day_with_most_engagement_average_history",
            "name": "day_with_most_engagement_average_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post",
            "name": "engagement_rate_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post_history",
            "name": "engagement_rate_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile",
            "name": "engagement_rate_per_profile",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_profile_history",
            "name": "engagement_rate_per_profile_history",
            "type": "NUMBER",
            "metric": true
        }
    ],
    'linkedin': [
        {
            "enum": "name",
            "name": "name",
            "label": "3 words name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "followers_today",
            "name": "followers_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_today_history",
            "name": "followers_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers",
            "name": "followers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_history",
            "name": "followers_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth",
            "name": "fans_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_history",
            "name": "followers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent",
            "name": "followers_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "followers_growth_percent_history",
            "name": "followers_growth_percent_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes",
            "name": "likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes_history",
            "name": "likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments",
            "name": "comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments_history",
            "name": "comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares",
            "name": "shares",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "shares_history",
            "name": "shares_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes",
            "name": "average_likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes_history",
            "name": "average_likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments",
            "name": "average_comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_history",
            "name": "average_comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_shares",
            "name": "average_shares",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_shares_history",
            "name": "average_shares_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts",
            "name": "posts",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "posts_history",
            "name": "posts_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post",
            "name": "engagement_rate_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_post_history",
            "name": "engagement_rate_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_page",
            "name": "engagement_rate_per_page",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_page_history",
            "name": "engagement_rate_per_page_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day",
            "name": "average_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day_history",
            "name": "average_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post",
            "name": "average_engagement_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_post_history",
            "name": "average_engagement_per_post_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day",
            "name": "average_posts_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_posts_per_day_history",
            "name": "average_posts_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach",
            "name": "reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "reach_history",
            "name": "reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_reach",
            "name": "avg_reach",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_reach_history",
            "name": "avg_reach_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "impressions",
            "name": "impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "impressions_history",
            "name": "impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_impressions",
            "name": "avg_impressions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_impressions_history",
            "name": "avg_impressions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "viral_interactions",
            "name": "viral_interactions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "viral_interactions_history",
            "name": "viral_interactions_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_video_views",
            "name": "total_video_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_video_views_history",
            "name": "total_video_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_views_per_video",
            "name": "avg_views_per_video",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_views_per_video_history",
            "name": "avg_views_per_video_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_watch_time",
            "name": "total_watch_time",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "total_watch_time_history",
            "name": "total_watch_time_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_watch_time_per_video",
            "name": "avg_watch_time_per_video",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "avg_watch_time_per_video_history",
            "name": "avg_watch_time_per_video_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "organic_followers_growth",
            "name": "organic_followers_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "organic_followers_growth_history",
            "name": "organic_followers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "paid_followers_growth",
            "name": "paid_followers_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "paid_followers_growth_history",
            "name": "paid_followers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "eng_rate_per_imp",
            "name": "eng_rate_per_imp",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "eng_rate_per_imp_history",
            "name": "eng_rate_per_imp_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "eng_rate_per_imp_per_post",
            "name": "eng_rate_per_imp_per_post",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "eng_rate_per_imp_per_post_history",
            "name": "eng_rate_per_imp_per_post_history",
            "type": "NUMBER",
            "metric": true
        }
    ],
    'youtube': [
        {
            "enum": "name",
            "name": "name",
            "label": "3 words name",
            "type": "TEXT",
            "metric": false
        },
        {
            "enum": "subscribers_today",
            "name": "subscribers_today",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers_today_history",
            "name": "subscribers_today_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers",
            "name": "subscribers",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers_history",
            "name": "subscribers_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers_growth",
            "name": "subscribers_growth",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers_growth_history",
            "name": "subscribers_growth_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "subscribers_growth_percent",
            "name": "subscribers_growth_percent",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "channel_views",
            "name": "channel_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "channel_views_history",
            "name": "channel_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes",
            "name": "likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "likes_history",
            "name": "likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "dislikes",
            "name": "dislikes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "dislikes_history",
            "name": "dislikes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "views",
            "name": "views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "views_history",
            "name": "views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments",
            "name": "comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "comments_history",
            "name": "comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "favorites",
            "name": "favorites",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "favorites_history",
            "name": "favorites_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement",
            "name": "engagement",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_history",
            "name": "engagement_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "videos",
            "name": "videos",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "videos_history",
            "name": "videos_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes",
            "name": "average_likes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_likes_history",
            "name": "average_likes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_dislikes",
            "name": "average_dislikes",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_dislikes_history",
            "name": "average_dislikes_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_views",
            "name": "average_views",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_views_history",
            "name": "average_views_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments",
            "name": "average_comments",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_comments_history",
            "name": "average_comments_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_favorites",
            "name": "average_favorites",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_favorites_history",
            "name": "average_favorites_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_video",
            "name": "engagement_rate_per_video",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_video_history",
            "name": "engagement_rate_per_video_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_channel",
            "name": "engagement_rate_per_channel",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "engagement_rate_per_channel_history",
            "name": "engagement_rate_per_channel_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day",
            "name": "average_engagement_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_day_history",
            "name": "average_engagement_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_video",
            "name": "average_engagement_per_video",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_engagement_per_video_history",
            "name": "average_engagement_per_video_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_videos_per_day",
            "name": "average_videos_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_videos_per_day_history",
            "name": "average_videos_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_views_per_day",
            "name": "average_views_per_day",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "average_views_per_day_history",
            "name": "average_views_per_day_history",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "viral_interactions",
            "name": "viral_interactions",
            "type": "NUMBER",
            "metric": true
        },
        {
            "enum": "viral_interactions_history",
            "name": "viral_interactions_history",
            "type": "NUMBER",
            "metric": true
        }
    ]
}

function validateAccount(key, callback) {
    const url = `http://localhost:6001/googledatastudio?method=validate&key=${key}`;
    // const url = `https://api.socialinsider.io/googledatastudio?method=validate&key=${key}`;

    axios(url)
        .then(response => response.data)
        .then(data => {
            if (!data.valid) return {error: 'invalid key'};

            console.log(data);

            let projectsEnum = [];
            let projectsLabel = [];

            for (const project of data.projects) {
                projectsEnum.push(project.projectname);
                projectsLabel.push(project.projectname);
            }
            let manifestCopy = originalManifest;
            manifestCopy['options']['properties']['project']['enum'] = projectsEnum;
            manifestCopy['options']['properties']['project']['labels'] = projectsLabel;
            
            callback && callback(manifestCopy);
        });
}

function buildJson(platform) {
    let enums = [];
    let labels = [];

    let metrics = platformMetrics[platform];
    for (const metric of metrics) {
        enums.push(metric['enum']);
        labels.push(metric['label']);
    }

    let manifestCopy = originalManifest;
    manifestCopy['options']['properties']['yValue']['enum'] = enums;
    manifestCopy['options']['properties']['yValue']['label'] = labels;

    return manifestCopy;
}

function writeManifest(manifest) {
    fs.unlink('../public/manifest.json', (err) => {
        if (err) {
            console.log('error writing manifest 1');
        } else {
            fs.writeFile('../public/manifest.json', JSON.stringify(manifest), (err) => {
                if (err) {
                    console.log('failed to write the manifest');
                } else {
                    console.log('successfully written the manifest');
                    console.log(fs.readFileSync('../public/manifest.json'));
                }
            });
        }
    });
}

export {
    platforms,
    buildJson,
    validateAccount,
    writeManifest
};